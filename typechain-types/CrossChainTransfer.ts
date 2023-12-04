/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace CrossChainTransfer {
  export type AddressTypeStruct = {
    Chain: BigNumberish;
    userAddress: BytesLike;
  };

  export type AddressTypeStructOutput = [Chain: bigint, userAddress: string] & {
    Chain: bigint;
    userAddress: string;
  };
}

export interface CrossChainTransferInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ROLE_CONTROLLER"
      | "admin"
      | "changeController"
      | "checkAllowance"
      | "checkBalance"
      | "controller"
      | "createCommitTransaction"
      | "createTransferTransaction"
      | "dynamicBytesToAddress"
      | "getCurrentNonce"
      | "incomingAdmin"
      | "pauseContract"
      | "transactions"
      | "unpauseContract"
      | "usdtContractAddress"
      | "userTransactionNonce"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "CommitCreated" | "TransferCompleted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ROLE_CONTROLLER",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeController",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "checkAllowance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createCommitTransaction",
    values: [BytesLike, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createTransferTransaction",
    values: [BytesLike, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dynamicBytesToAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "incomingAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pauseContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactions",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unpauseContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "usdtContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userTransactionNonce",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ROLE_CONTROLLER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCommitTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createTransferTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dynamicBytesToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "incomingAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pauseContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unpauseContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usdtContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userTransactionNonce",
    data: BytesLike
  ): Result;
}

export namespace CommitCreatedEvent {
  export type InputTuple = [
    transactionId: BytesLike,
    fromAddress: BytesLike,
    toAddress: BytesLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    transactionId: string,
    fromAddress: string,
    toAddress: string,
    amount: bigint
  ];
  export interface OutputObject {
    transactionId: string;
    fromAddress: string;
    toAddress: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferCompletedEvent {
  export type InputTuple = [
    transactionId: BytesLike,
    fromAddress: BytesLike,
    toAddress: BytesLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    transactionId: string,
    fromAddress: string,
    toAddress: string,
    amount: bigint
  ];
  export interface OutputObject {
    transactionId: string;
    fromAddress: string;
    toAddress: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CrossChainTransfer extends BaseContract {
  connect(runner?: ContractRunner | null): CrossChainTransfer;
  waitForDeployment(): Promise<this>;

  interface: CrossChainTransferInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  ROLE_CONTROLLER: TypedContractMethod<[], [string], "view">;

  admin: TypedContractMethod<[], [string], "view">;

  changeController: TypedContractMethod<
    [newController: AddressLike],
    [void],
    "nonpayable"
  >;

  checkAllowance: TypedContractMethod<[amount: BigNumberish], [void], "view">;

  checkBalance: TypedContractMethod<[amount: BigNumberish], [void], "view">;

  controller: TypedContractMethod<[], [string], "view">;

  createCommitTransaction: TypedContractMethod<
    [
      transactionId: BytesLike,
      fromAddress: BytesLike,
      toAddress: BytesLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  createTransferTransaction: TypedContractMethod<
    [
      transactionId: BytesLike,
      fromAddress: BytesLike,
      toAddress: BytesLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  dynamicBytesToAddress: TypedContractMethod<[b: BytesLike], [string], "view">;

  getCurrentNonce: TypedContractMethod<[], [bigint], "view">;

  incomingAdmin: TypedContractMethod<[], [string], "view">;

  pauseContract: TypedContractMethod<[], [void], "nonpayable">;

  transactions: TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        bigint,
        bigint,
        CrossChainTransfer.AddressTypeStructOutput,
        CrossChainTransfer.AddressTypeStructOutput,
        bigint,
        bigint
      ] & {
        transactionType: bigint;
        fromChain: bigint;
        fromAddress: CrossChainTransfer.AddressTypeStructOutput;
        toAddress: CrossChainTransfer.AddressTypeStructOutput;
        amount: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  unpauseContract: TypedContractMethod<[], [void], "nonpayable">;

  usdtContractAddress: TypedContractMethod<[], [string], "view">;

  userTransactionNonce: TypedContractMethod<
    [arg0: AddressLike],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ROLE_CONTROLLER"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "changeController"
  ): TypedContractMethod<[newController: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "checkAllowance"
  ): TypedContractMethod<[amount: BigNumberish], [void], "view">;
  getFunction(
    nameOrSignature: "checkBalance"
  ): TypedContractMethod<[amount: BigNumberish], [void], "view">;
  getFunction(
    nameOrSignature: "controller"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createCommitTransaction"
  ): TypedContractMethod<
    [
      transactionId: BytesLike,
      fromAddress: BytesLike,
      toAddress: BytesLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createTransferTransaction"
  ): TypedContractMethod<
    [
      transactionId: BytesLike,
      fromAddress: BytesLike,
      toAddress: BytesLike,
      amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "dynamicBytesToAddress"
  ): TypedContractMethod<[b: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getCurrentNonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "incomingAdmin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pauseContract"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transactions"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        bigint,
        bigint,
        CrossChainTransfer.AddressTypeStructOutput,
        CrossChainTransfer.AddressTypeStructOutput,
        bigint,
        bigint
      ] & {
        transactionType: bigint;
        fromChain: bigint;
        fromAddress: CrossChainTransfer.AddressTypeStructOutput;
        toAddress: CrossChainTransfer.AddressTypeStructOutput;
        amount: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "unpauseContract"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "usdtContractAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "userTransactionNonce"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getEvent(
    key: "CommitCreated"
  ): TypedContractEvent<
    CommitCreatedEvent.InputTuple,
    CommitCreatedEvent.OutputTuple,
    CommitCreatedEvent.OutputObject
  >;
  getEvent(
    key: "TransferCompleted"
  ): TypedContractEvent<
    TransferCompletedEvent.InputTuple,
    TransferCompletedEvent.OutputTuple,
    TransferCompletedEvent.OutputObject
  >;

  filters: {
    "CommitCreated(bytes,bytes,bytes,uint128)": TypedContractEvent<
      CommitCreatedEvent.InputTuple,
      CommitCreatedEvent.OutputTuple,
      CommitCreatedEvent.OutputObject
    >;
    CommitCreated: TypedContractEvent<
      CommitCreatedEvent.InputTuple,
      CommitCreatedEvent.OutputTuple,
      CommitCreatedEvent.OutputObject
    >;

    "TransferCompleted(bytes,bytes,bytes,uint128)": TypedContractEvent<
      TransferCompletedEvent.InputTuple,
      TransferCompletedEvent.OutputTuple,
      TransferCompletedEvent.OutputObject
    >;
    TransferCompleted: TypedContractEvent<
      TransferCompletedEvent.InputTuple,
      TransferCompletedEvent.OutputTuple,
      TransferCompletedEvent.OutputObject
    >;
  };
}