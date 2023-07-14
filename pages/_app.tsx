import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import DynamicPixels from "../Sdk/DynamicPixels";

export default function App({ Component, pageProps }: AppProps) {
  DynamicPixels.Setup("im49q2", "ijm6qtxpob9l8jq13oe7ca", false);
  return <Component {...pageProps} />
}
