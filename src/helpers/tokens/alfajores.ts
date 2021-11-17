import { IToken } from ".";
import AvaxIcon from "src/assets/tokens/AVAX.svg";
import DaiEIcon from "src/assets/tokens/DAI.e.png";
import FraxIcon from "src/assets/tokens/FRAX.png";
import TimeIcon from "src/assets/tokens/STABIL.svg";

export const celo: IToken = {
  name: "CELO",
  isCelo: true,
  img: AvaxIcon,
  address: "",
  decimals: 18,
};

const dai: IToken = {
  name: "DAI.e",
  address: "0x0Fe50bbb997C5CB0F3C88E4cF1f3e34049617711",
  img: DaiEIcon,
  decimals: 18,
};

const frax: IToken = {
  name: "FRAX",
  address: "0x1E09a7Fd5878e31360Aad05B31B3a1856e74f9e1",
  img: FraxIcon,
  decimals: 18,
};

export const usd: IToken = {
  name: "DAI",
  address: "0x0Fe50bbb997C5CB0F3C88E4cF1f3e34049617711",
  img: DaiEIcon,
  decimals: 18,
};

const stabil: IToken = {
  name: "STABIL",
  address: "0x94D278F05377EfE6faf21a82402fDaE03bC83D5d",
  img: TimeIcon,
  decimals: 9,
};

export default [celo, dai, frax, usd, stabil];
