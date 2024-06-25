export default function NFTBox({ name, image, description, attributes }) {
    return (
        <div className="max-w-sm dark-bg-taiko mb-10 rounded-lg">
            <div>
                <img className="rounded-lg" src={image} alt={`NFT ${name}`} />
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white tracking-widest">{name}</h5>
                <p className="text-sm mb-4 font-normal text-zinc-700 dark:text-zinc-400">{description}</p>
                <h6 className="mb-1 text-l font-bold tracking-tight text-zinc-900 dark:text-white tracking-widest">Attributes:</h6>
                <ul className="list-inside list-disc text-sm font-semibold mb-2 font-normal text-zinc-700 dark:text-zinc-300 leading-6">
                    <li>Position: {attributes.position}</li>
                    <li>Wen Set: {attributes.wenSet} </li>
                    <li>Stuff Meter: {attributes.stuffMeter}</li>
                    <li>Rotation Speed: {attributes.rotationSpeed}</li>
                    <li>Palette: {attributes.palette}</li>
                    <li>Segment: {attributes.segment}</li>
                    <li>Speed: {attributes.speed}</li>
                </ul>
            </div>
        </div>
    )
}