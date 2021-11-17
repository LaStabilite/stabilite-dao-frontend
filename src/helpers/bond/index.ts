import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";
import MimTimeIcon from "../../assets/tokens/STABIL-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/STABIL-AVAX.svg";

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
  bondIconSvg: MimIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  networkAddrs: {
    [Networks.ALFAJORES]: {
      bondAddress: "0xD6dD3C6ace489C81bB12a35f858909c4325efbe6",
      reserveAddress: "0x0Fe50bbb997C5CB0F3C88E4cF1f3e34049617711",
    },
  },
});

export const usdStabil = new LPBond({
  name: "usd_stabil_lp",
  displayName: "STABIL-MIM LP",
  bondToken: "MIM",
  bondIconSvg: MimTimeIcon,
  bondContractABI: LpBondContract,
  reserveContractAbi: LpReserveContract,
  networkAddrs: {
    [Networks.ALFAJORES]: {
      bondAddress: "",
      reserveAddress: "0xf0131cBDC6BD62E0968c64C68748A4adcD897dcD",
    },
  },
  lpUrl:
    "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export default [usd];
