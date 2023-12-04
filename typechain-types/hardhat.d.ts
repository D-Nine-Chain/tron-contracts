/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "CrossChainTransfer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CrossChainTransfer__factory>;
    getContractFactory(
      name: "ITRC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITRC20__factory>;

    getContractAt(
      name: "CrossChainTransfer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CrossChainTransfer>;
    getContractAt(
      name: "ITRC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ITRC20>;

    deployContract(
      name: "CrossChainTransfer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CrossChainTransfer>;
    deployContract(
      name: "ITRC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ITRC20>;

    deployContract(
      name: "CrossChainTransfer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CrossChainTransfer>;
    deployContract(
      name: "ITRC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ITRC20>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}