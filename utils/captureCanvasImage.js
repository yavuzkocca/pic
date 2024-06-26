import { uploadMetaToIPFS } from "./uploadToIPFS"

export const captureCanvasImage = (data) => {
    const canvas = document.querySelector('#defaultCanvas0');
    if (canvas) {
        const imageDataUrl = canvas.toDataURL();
        console.log("ccI" + canvas)
        const ipfsUri = uploadMetaToIPFS(imageDataUrl, data);

        return ipfsUri
    } else {
        console.error('Canvas element not found or not initialized.');
    }
};