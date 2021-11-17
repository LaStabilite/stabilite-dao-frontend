import TimeImg from "../assets/tokens/STABIL.svg";
import MemoImg from "../assets/tokens/sSTABIL.png";

function toUrl(tokenPath: string): string {
  const host = window.location.origin;
  return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
  if (name === "time") {
    return toUrl(TimeImg);
  }

  if (name === "memo") {
    return toUrl(MemoImg);
  }

  throw Error(`Token url doesn't support: ${name}`);
}
