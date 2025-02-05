import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <SpeedInsights />
      <Analytics />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
