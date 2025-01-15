// pages/_app.js
import '../styles/globals.css';
import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
init('39GutgomRT0mW-frk');

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
