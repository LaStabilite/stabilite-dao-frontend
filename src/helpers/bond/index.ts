import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond } from "./stable-bond";

import StabilUSDIcon from "../../assets/tokens/stabilUSD.svg";
import MimTimeIcon from "../../assets/tokens/STABIL-MIM.svg";

import {
  StableBondContract,
  LpBondContract,
  StableReserveContract,
  LpReserveContract,
} from "../../abi";

export const usd = new StableBond({
  name: "stabilUSD",
  displayName: "stabilUSD",
  bondToken: "stabilUSD",
  bondIconSvg: StabilUSDIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.ALFAJORES]: {
      bondAddress: "0x92b7a2AaC2d0eA090e157E95cA44511852372255",
      reserveAddress: "0x8036Ff9fAc4bBe54355c6d9565ac301c79B79686",
    },
  },
});

export const usdStabil = new LPBond({
  name: "usd_stabil_lp",
  displayName: "STABIL-stabilUSD LP",
  bondToken: "MIM",
  bondIconSvg: MimTimeIcon,
  bondContractABI: LpBondContract,
  reserveContractAbi: LpReserveContract,
  networkAddrs: {
    [Networks.ALFAJORES]: {
      bondAddress: "0x37a23c9Ccc51B9138620A5ff401695338C966E26",
      reserveAddress: "0x7283dC9DCb7981bD10844b0D5A1bBA718E0C21Fb",
    },
  },
  lpUrl:
    "https://app.ubeswap.org/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export default [usd, usdStabil];
