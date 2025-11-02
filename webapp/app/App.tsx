// pages/_app.tsx

import { AppProps } from 'next/app'; // Import AppProps type
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;