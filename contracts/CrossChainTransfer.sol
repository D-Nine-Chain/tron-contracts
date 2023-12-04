// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
interface ITRC20 {
      function totalSupply() external view returns (uint256);

      function balanceOf(address account) external view returns (uint256);

      function transfer(address recipient, uint256 amount) external returns (bool);

      function allowance(address owner, address spender) external view returns (uint256);

      function approve(address spender, uint256 amount) external returns (bool);

      function transferFrom(
            address sender,
            address recipient,
            uint256 amount
      ) external returns (bool);

      event Transfer(address indexed from, address indexed to, uint256 value);
      event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract CrossChainTransfer {
      mapping(address => uint64) public userTransactionNonce; //increments on commits and Transfers
      address public admin;
      address public incomingAdmin;
      address public controller;
      ITRC20 public usdtContractAddress;
      string public constant ROLE_CONTROLLER = 'controller';
      mapping(bytes => Transaction) public transactions;
      bool paused;

      enum Chain {
            D9,
            Tron
      }

      enum TransactionType {
            Commit,
            Transfer
      }

      struct AddressType {
            Chain Chain;
            bytes userAddress;
      }

      struct Transaction {
            TransactionType transactionType;
            Chain fromChain;
            AddressType fromAddress;
            AddressType toAddress;
            uint128 amount;
            uint256 timestamp;
      }
      event CommitCreated(
            bytes indexed transactionId,
            bytes indexed fromAddress,
            bytes indexed toAddress,
            uint128 amount
      );

      event TransferCompleted(
            bytes indexed transactionId,
            bytes indexed fromAddress,
            bytes indexed toAddress,
            uint128 amount
      );

      constructor(address usdtContract) payable {
            controller = msg.sender;
            usdtContractAddress = ITRC20(usdtContract);
            paused = false;
      }

      modifier onlyCallablyBy(address account) {
            require(msg.sender == account, 'Not Callable by User');
            _;
      }

      modifier whenNotPaused() {
            require(!paused, 'Contract is Paused');
            _;
      }

      function getCurrentNonce() public view returns (uint64) {
            return userTransactionNonce[msg.sender];
      }

      function createCommitTransaction(
            bytes calldata transactionId,
            bytes calldata fromAddress,
            bytes calldata toAddress,
            uint128 amount
      ) public whenNotPaused onlyCallablyBy(controller) {
            ensureUniqueTransaction(transactionId);
            require(
                  userTransactionNonce[msg.sender] + 1 > userTransactionNonce[msg.sender],
                  'Nonce Overflow'
            );
            validateCommit(fromAddress, toAddress, amount);

            transactions[transactionId] = Transaction(
                  TransactionType.Commit,
                  Chain.Tron,
                  AddressType(Chain.Tron, fromAddress),
                  AddressType(Chain.D9, toAddress),
                  amount,
                  block.timestamp
            );
            address userAddress = dynamicBytesToAddress(fromAddress);
            transferUsdtFromUser(userAddress, amount);
            userTransactionNonce[msg.sender] += 1;
            emit CommitCreated(transactionId, fromAddress, toAddress, amount);
      }

      function createTransferTransaction(
            bytes calldata transactionId,
            bytes calldata fromAddress,
            bytes calldata toAddress,
            uint128 amount
      ) public whenNotPaused onlyCallablyBy(controller) {
            ensureUniqueTransaction(transactionId);
            require(
                  userTransactionNonce[msg.sender] + 1 > userTransactionNonce[msg.sender],
                  'Nonce Overflow'
            );

            transactions[transactionId] = Transaction(
                  TransactionType.Transfer,
                  Chain.Tron,
                  AddressType(Chain.Tron, fromAddress),
                  AddressType(Chain.D9, toAddress),
                  amount,
                  block.timestamp
            );

            transferUsdtToUser(dynamicBytesToAddress(toAddress), amount);
            userTransactionNonce[msg.sender] += 1;
            emit TransferCompleted(transactionId, fromAddress, toAddress, amount);
      }

      function dynamicBytesToAddress(bytes memory b) public pure returns (address) {
            require(b.length >= 20, 'Byte array too short');
            uint160 addr;
            assembly {
                  addr := mload(add(b, add(0x20, sub(mload(b), 20))))
            }
            return address(addr);
      }

      function validateCommit(
            bytes calldata fromAddress,
            bytes calldata toAddress,
            uint128 amount
      ) internal view {
            require(amount > 0, 'Amount must be greater than 0');
            require(bytes(fromAddress).length >= 20, 'From Address must be 20 bytes');
            require(bytes(toAddress).length == 32, 'To Address must be 32 bytes');
            checkAllowance(amount);
            checkBalance(amount);
      }

      function transferUsdtFromUser(address userAddress, uint256 amount) private {
            ITRC20(usdtContractAddress).transferFrom(userAddress, address(this), amount);
      }

      function transferUsdtToUser(address userAddress, uint256 amount) private {
            ITRC20(usdtContractAddress).transfer(userAddress, amount);
      }

      function checkAllowance(uint256 amount) public view {
            uint256 allowance = ITRC20(usdtContractAddress).allowance(
                  msg.sender,
                  address(this)
            );
            require(amount >= allowance, 'Insufficient Allowance');
      }

      function checkBalance(uint256 amount) public view {
            uint256 balance = ITRC20(usdtContractAddress).balanceOf(msg.sender);
            require(amount >= balance, 'Insufficient Balance');
      }

      function ensureUniqueTransaction(bytes calldata transactionId) internal view {
            require(
                  transactions[transactionId].timestamp == 0,
                  'Transaction already exists'
            );
      }

      function changeController(address newController) public onlyCallablyBy(admin) {
            controller = newController;
      }

      function pauseContract() public onlyCallablyBy(admin) {
            paused = true;
      }

      function unpauseContract() public onlyCallablyBy(admin) {
            paused = false;
      }
}
