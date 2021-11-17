import { SvgIcon } from "@material-ui/core";
import { ReactComponent as UsdImg } from "../assets/tokens/stabilUSD.svg";
import { IAllBondData } from "../hooks/bonds";
import { usd } from "../helpers/bond";

export const priceUnits = (bond: IAllBondData) => {
  if (bond.name === usd.name)
    return (
      <SvgIcon
        component={UsdImg}
        viewBox="0 0 32 32"
        style={{ height: "15px", width: "15px" }}
      />
    );

  return "$";
};
