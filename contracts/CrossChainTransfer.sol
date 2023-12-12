// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
interface ITRC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract CrossChainTransfer {
    mapping(address => uint64) public userTransactionNonce; //increments on commits and Transfers
    address public admin;
    address public incomingAdmin;
    address public controller;
    ITRC20 public usdtContractAddress;
    string public constant ROLE_CONTROLLER = "controller";
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
        uint256 amount;
        uint256 timestamp;
    }
    event AssetCommited(
        bytes indexed transactionId,
        bytes indexed fromAddress,
        bytes indexed toAddress,
        uint256 amount
    );
    event CommitUndone(
        bytes indexed transactionId,
        bytes indexed fromAddress,
        bytes indexed toAddress,
        uint256 amount
    );
    event AssetDispatched(
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
        require(msg.sender == account, "Not Callable by User");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is Paused");
        _;
    }

    function getCurrentNonce(address userAddress) public view returns (uint64) {
        return userTransactionNonce[userAddress];
    }

    function getTransaction(
        bytes calldata transactionId
    ) public view returns (Transaction memory) {
        Transaction memory transaction = transactions[transactionId];
        return transaction;
    }

    function switchUSDTContract(
        address newUSDTContract
    ) public onlyCallablyBy(admin) {
        usdtContractAddress = ITRC20(newUSDTContract);
    }

    function assetCommit(
        bytes calldata transactionId,
        address fromAddress,
        bytes calldata fromAddressBytes,
        bytes calldata toAddressBytes,
        uint256 amount
    ) public whenNotPaused onlyCallablyBy(controller) returns (bytes memory) {
        ensureUniqueTransaction(transactionId);
        require(
            userTransactionNonce[msg.sender] + 1 >
                userTransactionNonce[msg.sender],
            "Nonce Overflow"
        );

        validateCommit(fromAddress, toAddressBytes, amount);
        transactions[transactionId] = Transaction(
            TransactionType.Commit,
            Chain.Tron,
            AddressType(Chain.Tron, fromAddressBytes),
            AddressType(Chain.D9, toAddressBytes),
            amount,
            block.timestamp
        );
        transferUsdtFromUser(fromAddress, amount);
        userTransactionNonce[msg.sender] += 1;
        emit AssetCommited(
            transactionId,
            fromAddressBytes,
            toAddressBytes,
            amount
        );
        return transactionId;
    }

    function undoAssetCommit(
        bytes calldata transactionId
    ) public whenNotPaused onlyCallablyBy(controller) {
        Transaction memory transaction = transactions[transactionId];
        require(transaction.timestamp > 0, "Transaction does not exist");
        require(
            transaction.transactionType == TransactionType.Commit,
            "Transaction is not a commit"
        );
        address user = bytesToAddress(transaction.fromAddress.userAddress);
        transferUsdtToUser(user, transaction.amount);
        transactions[transactionId].timestamp = 0;
        userTransactionNonce[user] -= 1;
        emit CommitUndone(
            transactionId,
            transaction.fromAddress.userAddress,
            transaction.toAddress.userAddress,
            transaction.amount
        );
    }

    function assetDispatch(
        bytes calldata transactionId,
        address toAddress,
        bytes calldata fromAddressBytes,
        bytes calldata toAddressBytes,
        uint128 amount
    ) public whenNotPaused onlyCallablyBy(controller) returns (bytes memory) {
        ensureUniqueTransaction(transactionId);
        require(
            userTransactionNonce[msg.sender] + 1 >
                userTransactionNonce[msg.sender],
            "Nonce Overflow"
        );
        validateTransfer(fromAddressBytes, amount);
        transactions[transactionId] = Transaction(
            TransactionType.Transfer,
            Chain.Tron,
            AddressType(Chain.D9, fromAddressBytes),
            AddressType(Chain.Tron, toAddressBytes),
            amount,
            block.timestamp
        );

        transferUsdtToUser(toAddress, amount);
        userTransactionNonce[msg.sender] += 1;
        emit AssetDispatched(
            transactionId,
            fromAddressBytes,
            toAddressBytes,
            amount
        );
        return transactionId;
    }

    function bytesToAddress(bytes memory b) public pure returns (address) {
        require(b.length >= 20, "Byte array too short");
        uint160 addr;
        assembly {
            addr := mload(add(b, add(0x20, sub(mload(b), 20))))
            // addr := mload(add(b, 0x14))
        }
        return address(addr);
    }

    function validateCommit(
        address fromAddress,
        bytes calldata toAddress,
        uint256 amount
    ) internal view {
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(toAddress).length == 32, "To Address must be 32 bytes");
        checkAllowance(fromAddress, amount);
        checkBalance(fromAddress, amount);
    }

    function validateTransfer(
        bytes calldata fromAddress,
        uint256 amount
    ) internal view {
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(fromAddress).length == 32, "Address must be 32 bytes");
        uint256 balance = ITRC20(usdtContractAddress).balanceOf(address(this));
        require(amount <= balance, "ContractUSDTBalanceInsufficient");
    }

    function transferUsdtFromUser(address userAddress, uint256 amount) private {
        ITRC20(usdtContractAddress).transferFrom(
            userAddress,
            address(this),
            amount
        );
    }

    function transferUsdtToUser(address userAddress, uint256 amount) private {
        ITRC20(usdtContractAddress).transfer(userAddress, amount);
    }

    function checkAllowance(address user, uint256 amount) public view {
        uint256 allowance = ITRC20(usdtContractAddress).allowance(
            user,
            address(this)
        );
        require(amount <= allowance, "Insufficient Allowance");
    }

    function checkBalance(address user, uint256 amount) public view {
        uint256 balance = ITRC20(usdtContractAddress).balanceOf(user);
        require(amount <= balance, "USDTBalanceInsufficient");
    }

    function ensureUniqueTransaction(
        bytes calldata transactionId
    ) internal view {
        require(
            transactions[transactionId].timestamp == 0,
            "Transaction already exists"
        );
    }

    function changeController(
        address newController
    ) public onlyCallablyBy(admin) {
        controller = newController;
    }

    function pauseContract() public onlyCallablyBy(admin) {
        paused = true;
    }

    function unpauseContract() public onlyCallablyBy(admin) {
        paused = false;
    }
}
