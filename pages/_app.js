import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/taiko.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { DataProvider } from "../components/DataContext"

const queryClient = new QueryClient()


const config = getDefaultConfig({
  appName: 'Raffle',
  projectId: '6748d532ac67647cd2eec1b96272ba77',
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});



function MyApp({ Component, pageProps }) {

  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#F0148C',
            accentColorForeground: 'white',
          })}>
          <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
              <DataProvider>
                <Component {...pageProps} />
              </DataProvider>
            </NotificationProvider>
          </MoralisProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default MyApp;
