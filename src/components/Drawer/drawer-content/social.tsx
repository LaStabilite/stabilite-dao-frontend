import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link
        href="https://github.com/LaStabilite/stabilite-dao-frontend"
        target="_blank"
      >
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="https://twitter.com/LaStabilite" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="http://discord.gg/mE6ZWjxRsW" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
