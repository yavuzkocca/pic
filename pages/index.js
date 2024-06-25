import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import { useAccount } from 'wagmi'
import { mainnet, sepolia, baseSepolia } from '@wagmi/core/chains'
import Wrapper2 from "../components/Wrapper2"
import NFTBoxContainer from "../components/NFTBoxContainer"


export default function Home() {

  const { address, isConnecting, isConnected, isDisconnected } = useAccount()
  return (
    <div className="light-bg-taiko min-h-screen" >
      <Head>
        <title>Wagasa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-evenly items-center">
        <Wrapper2 className=" rounded-lg" />
        {isConnected ? (
          <div>
            {baseSepolia ? (
              <div className="">
                <LotteryEntrance className="p-8" />
              </div>
            ) : (
              <div>{`Please switch to BASE Sepolia to see the Raffle...`}</div>
            )}
          </div>
        ) : (

          <div className="p-5 flex h-[700px] w-[700px] items-center justify-center">
            <div className="w-full max-w-2xl items-center justify-center bg-white shadow dark-bg-taiko rounded-lg">
              <div className="p-5 m-10">
                <div>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5 tracking-widest">Wagasa</h5>
                  <p className="leading-6 text-m text-gray-900 dark:text-white mb-4">WAGASA is a limited series collection of 10,000 generative artworks, encapsulating themes of nihilism, inherent cruelty, and greed—echoing our trivial existence in an uncaring universe.
                  <br></br>   <br></br> Each element in these artworks—from colors to strokes—reflects the fleeting nature of life amidst an eternal void, the scars of violence, and the complacency they foster.
                    <br></br> <br></br> Though seemingly colorful and tranquil, underlying currents challenge the observer to confront deeper truths.
                    WAGASA, not for the faint of heart, mirrors our darkest despair and spurs introspection, urging us to confront our demons and strive for a better future.
                  </p>
                  <div className="text-xl font-semibold tracking-tight text-gray-900 dark:text-pink-500 mb-2 tracking-widest">Please Connect to a Wallet</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <NFTBoxContainer />

      <footer className="bg-white shadow dark-bg-taiko mt-10 flex flex-row">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="https://i.ibb.co/bPMZbSf/team-rocket-logo-32.png" className="h-8" alt="RocketTeam Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white tracking-widest pl-2">RocketTeam</span>
            </span>

          </div>
          <hr className="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
          <span className="block text-sm text-zinc-500 sm:text-center dark:text-white  tracking-widest">© 2024 RocketTeam. All Rights Reserved.</span>
        </div>
      </footer>
    </div>


  );
}
