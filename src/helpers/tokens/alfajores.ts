import { IToken } from ".";
import AvaxIcon from "src/assets/tokens/AVAX.svg";
import StabilUSDIcon from "src/assets/tokens/stabilUSD.svg";
import StabilIcon from "src/assets/tokens/STABIL.svg";

export const celo: IToken = {
  name: "CELO",
  isCelo: true,
  img: AvaxIcon,
  address: "",
  decimals: 18,
};

export const stabilUSD: IToken = {
  name: "stabilUSD",
  address: "0x8036Ff9fAc4bBe54355c6d9565ac301c79B79686",
  img: StabilUSDIcon,
  decimals: 18,
};

const stabil: IToken = {
  name: "STABIL",
  address: "0x97414055aaEC07729d6F4d2ee43c64Bc85a083BA",
  img: StabilIcon,
  decimals: 9,
};

export default [celo, stabilUSD, stabil];
