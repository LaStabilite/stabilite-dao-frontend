import { Networks } from "src/constants";
import AlfajoresTokens from "src/helpers/tokens/alfajores";

export interface IToken {
  name: string;
  address: string;
  img: string;
  isCelo?: boolean;
  decimals: number;
}

export default { [Networks.ALFAJORES]: AlfajoresTokens };
