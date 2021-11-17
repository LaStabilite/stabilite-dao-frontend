import { useState } from "react";
import {
  getAddresses,
  TOKEN_DECIMALS,
  DEFAULT_NETWORK,
} from "../../../constants";
import { useSelector } from "react-redux";
import { Link, Fade, Popper } from "@material-ui/core";
import "./stabil-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";

const addTokenToWallet =
  (tokenSymbol: string, tokenAddress: string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: TOKEN_DECIMALS,
              image: tokenImage,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

function TimeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;

  const networkID = useSelector<IReduxState, number>(state => {
    return (state.app && state.app.networkID) || DEFAULT_NETWORK;
  });

  const addresses = getAddresses(networkID);

  const sSTABIL_ADDRESS = addresses.sSTABIL_ADDRESS;
  const STABIL_ADDRESS = addresses.STABIL_ADDRESS;

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className="stabil-menu-root"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
    >
      <div className="stabil-menu-btn">
        <p>STABIL</p>
      </div>

      <Popper
        className="stabil-menu-popper"
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="tooltip">
              <Link
                className="tooltip-item"
                href={`https://app.ubeswap.org/#/swap?inputCurrency=&outputCurrency=${STABIL_ADDRESS}`}
                target="_blank"
              >
                <p>Buy on Ubeswap</p>
              </Link>

              {isEthereumAPIAvailable && (
                <div className="add-tokens">
                  <div className="divider" />
                  <p className="add-tokens-title">ADD TOKEN TO WALLET</p>
                  <div className="divider" />
                  <div
                    className="tooltip-item"
                    onClick={addTokenToWallet("STABIL", STABIL_ADDRESS)}
                  >
                    <p>STABIL</p>
                  </div>
                  <div
                    className="tooltip-item"
                    onClick={addTokenToWallet("sSTABIL", sSTABIL_ADDRESS)}
                  >
                    <p>sSTABIL</p>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default TimeMenu;
