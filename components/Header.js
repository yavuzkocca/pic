import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    return (
        <>
            <footer className="bg-white shadow dark:bg-black flex flex-row mb-10 pb-3 pt-2 border-b border-b-zinc-700">
                <div className="w-full max-w-screen-xl mx-auto p-4">
                    <nav className="flex flex-row bg-black">
                        <img src='https://i.ibb.co/fH0MQ5M/treeverse-100-2-logo.png' />
                        {<h1 className="py-6 px-4 font-semibold text-4xl text-green-500 tracking-widest"> TreeVerse</h1>}
                        <div className="ml-auto py-2 mt-5">
                            <ConnectButton />
                        </div>
                    </nav>
                </div>
            </footer>
        </>
    )
}