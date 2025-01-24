// pages/_app.js
import '../styles/globals.css';
import { init } from '@emailjs/browser';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// Initialize EmailJS with your public key
init('39GutgomRT0mW-frk');

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
