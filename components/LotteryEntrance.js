import FishABI from "../constants/FishABI.json";
import { useNotification } from "web3uikit";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import dotenv from 'dotenv';
import Wrapper from "./Wrapper";
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../components/DataContext';
import { captureCanvasImage } from "../utils/captureCanvasImage";

dotenv.config();

export default function LotteryEntrance() {
    const provider = new ethers.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_PROVIDER}`);
    const FishContract = process.env.FISH_CONTRACT;
    console.log("FCT" + FishContract)

    const provide = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provide.getSigner();

    const dispatch = useNotification();
    const contract = new ethers.Contract(FishContract, FishABI, signer);

    const { address, chainId } = useAccount();
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const { data, setData, iref, cata, setCata } = useContext(DataContext);
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState(null);
    const [minting, setMinting] = useState(false);
    const [tsupply, setTsupply] = useState(0)
    const [tokenHash, setTokenHash] = useState(null)


    const tokenID = async () => {
        const tid = await contract.totalSupply();
        setId(tid.toNumber());
        setTokenHash(`${address}${unixTimestamp}${tid}`)
        const userData = {
            contractAddress: process.env.FISH_CONTRACT,
            chainId: chainId,
            editionSize: 100,
            mintSize: '1',
            mintIteration: '1',
            tokenId: tid.toNumber(),
            walletAddress: address,
            timestamp: unixTimestamp,
        };
        setUserData(userData);
    };

    console.log("dat" + JSON.stringify(data));
    console.log(JSON.stringify(userData));
    console.log(id)
    console.log(tokenHash)

    async function mintFish(tokenId, URI, tokenHash) {
        const contract = new ethers.Contract(FishContract, FishABI, signer);
        console.log(URI);

        try {
            const transaction = await contract.mintFish(tokenId, URI, tokenHash, {
                value: ethers.utils.parseEther("0.000001"),
            });
            await transaction.wait();
            handleSuccess(transaction);
            setId(null);
            setUserData(null)
            setCata(false)
            setData(null)
            return transaction;
        } catch (error) {
            if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
                return "Insufficient funds in the wallet.";
            } else if (error.message.includes("reverted")) {
                return "Transaction reverted: Ether value sent is below the price.";
            } else {
                return `Error: ${error.message}`;
            }
        }
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        } finally {
            setMinting(false);
        }
    };

    useEffect(() => {
        if (userData && data && id && tokenHash) {

            const mintFishProcess = async () => {
                const URL = await captureCanvasImage(data);
                console.log(URL);
                const cleanUri = URL.replace('ipfs://', '');
                const lastUri = `https://ipfs.io/ipfs/${cleanUri}`;
                console.log("TH" + tokenHash)
                console.log("TH" + id)
                console.log("TH" + lastUri)
                await mintFish(id, lastUri, tokenHash);
            };
            mintFishProcess();
        }
    }, [userData, data, id]);

    useEffect(() => {

        const fetchTotalSupply = async () => {
            const total = await contract.totalSupply();
            setTsupply(total.toNumber());
        };
        fetchTotalSupply()

    }, [userData, data, id]);


    return (
        <>
            <div className="p-5 flex h-[700px] w-[700px] items-center justify-center ">
                <div className="w-full max-w-2xl items-center justify-center bg-white shadow dark:bg-zinc-950 dark-bg-taiko rounded-lg">
                    <div className="p-5 m-10 ">
                        <div>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5 tracking-widest">Wagasa</h5>
                            <p className="leading-6 text-m text-gray-900 dark:text-white mb-4">WAGASA is a limited series collection of 10,000 generative artworks, encapsulating themes of nihilism, inherent cruelty, and greed—echoing our trivial existence in an uncaring universe.
                                <br></br>   <br></br> Each element in these artworks—from colors to strokes—reflects the fleeting nature of life amidst an eternal void, the scars of violence, and the complacency they foster.
                                <br></br> <br></br> Though seemingly colorful and tranquil, underlying currents challenge the observer to confront deeper truths.
                                WAGASA, not for the faint of heart, mirrors our darkest despair and spurs introspection, urging us to confront our demons and strive for a better future.
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white tracking-widest">Price: 0.001 ETH</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white mt-2 tracking-widest">{tsupply} / 10,000 Minted</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`rounded-lg theme-taiko-logocolor hover:bg-pink-800 text-white font-bold px-20 py-3.5 mt-5 ${minting ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={async () => {
                                    setMinting(true);
                                    await tokenID();
                                }}
                                disabled={minting}
                            >
                                {minting ? "Minting..." : "Mint"}
                            </button>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white tracking-widest mt-5">Please wait 10 seconds before the wallet pops up.</p>
                    </div>
                </div>
            </div>

            <Wrapper userData={userData} />
        </>
    );
}
