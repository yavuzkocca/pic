import { ethers } from 'ethers';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import hl from '../constants/hl-gen3';
import FishABI from "../constants/FishABI.json";


export function sketch(p5, tokenHash) {
    console.log(tokenHash + "ç")

    const high = hl(tokenHash)


    let spheres = [];
    let palette;


    function pickNumber(numbers, weights) {
        let totalWeight = weights.reduce((a, b) => a + b, 0);
        let randomNumber = high.randomInt(0, totalWeight);
        let weightSum = 0;

        for (let i = 0; i < numbers.length; i++) {
            weightSum += weights[i];
            if (randomNumber <= weightSum) {
                return { number: numbers[i], index: i };
            }
        }
    }

    let rotationSpeed = high.random(0.01, 0.03);
    let n = Math.floor(high.random(1, 20)) * 10;
    let maxRadius = high.random(1.5, 2.5);
    let off = high.randomInt(0, 1000);

    let segments;
    let segmentNumbers = [12, 24, 20, 30, 36];
    let weightss = [3, 5, 4, 2, 1];
    let segmentTraits = ["12", "24", "20", "30", "36"];
    let segmentResult = pickNumber(segmentNumbers, weightss);
    let segmentPickedNumber = segmentResult.number;
    let segmentPickedTrait = segmentTraits[segmentResult.index];

    let speedNumbers = [0.01, 0.0125, 0.015, 0.0175, 0.02];
    let weightsSpeed = [3, 5, 4, 2, 1];
    let speedTraits = ["verySlow", "slowly", "notFast", "fast", "fastAndFurious"];
    let speedResult = pickNumber(speedNumbers, weightsSpeed);
    let speedPickedNumber = speedResult.number;
    let speedPickedTrait = speedTraits[speedResult.index];
    let speed = speedPickedNumber;
    let otherdata = {}

    let paletteTrait = [
        "Radioactive Peacock",
        "Puddle of Puke",
        "Sweat Stain",
        "Faded Memories",
        "Deadly Migraine",
        "Moldy Shower Curtain",
        "Satan's Sunrise",
        "Post-Apocalyptic Rainbow",
    ];

    const artworkWidth = 700;
    const artworkHeight = 700;

    let colorPalletePicker;
    const weights = [0.2, 0.2, 0.1, 0.2, 0.1, 0.1, 0.05, 0.05];
    const randomNum = high.random(0, 1);
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
        weightSum += weights[i];
        if (randomNum <= weightSum) {
            colorPalletePicker = i;
            break;
        }
    }

    p5.setup = () => {
        switch (colorPalletePicker) {
            case 0:
                palette = [
                    [1, 22, 39],
                    [253, 255, 252],
                    [46, 196, 182],
                    [231, 29, 54],
                    [255, 159, 28],
                ];
                break;
            case 1:
                palette = [
                    [0, 18, 25],
                    [0, 95, 115],
                    [10, 147, 150],
                    [148, 210, 189],
                    [233, 216, 166],
                    [238, 155, 0],
                    [202, 103, 2],
                    [187, 62, 3],
                    [174, 32, 18],
                    [155, 34, 38],
                ];
                break;
            case 2:
                palette = [
                    [96, 108, 56],
                    [40, 54, 24],
                    [254, 250, 224],
                    [221, 161, 94],
                    [188, 108, 37],
                ];
                break;
            case 3:
                palette = [
                    [230, 57, 70],
                    [241, 250, 238],
                    [168, 218, 220],
                    [69, 123, 157],
                    [29, 53, 87],
                ];
                break;
            case 4:
                palette = [
                    [255, 190, 11],
                    [251, 86, 7],
                    [240, 20, 140],
                    [131, 56, 236],
                    [58, 134, 255],
                ];
                break;
            case 5:
                palette = [
                    [218, 215, 205],
                    [163, 177, 138],
                    [88, 129, 87],
                    [58, 90, 64],
                    [52, 78, 65],
                ];
                break;
            case 6:
                palette = [
                    [3, 7, 30],
                    [55, 6, 23],
                    [106, 4, 15],
                    [157, 2, 8],
                    [208, 0, 0],
                    [220, 47, 2],
                    [232, 93, 4],
                    [244, 140, 6],
                    [250, 163, 7],
                    [255, 186, 8],
                ];
                break;
            case 7:
                palette = [
                    [240, 20, 140],
                    [255, 202, 58],
                    [138, 201, 38],
                    [25, 130, 196],
                    [106, 76, 147],
                ];
                break;
        }

        p5.createCanvas(artworkWidth, artworkHeight);
        p5.background(0);
        p5.noStroke();
        for (let i = 0; i < n; i++) {
            let x = high.random(0, p5.windowHeight);
            let y = high.random(0, p5.windowHeight);
            let r = (high.random(20, 50) * p5.windowHeight) / 600;

            let c = palette[Math.floor(high.random(0, palette.length))];
            console.log(c)
            spheres.push(new Sphere(x, y, r, c));
        }
    };

    p5.draw = () => {
        p5.background(0, 50);
        for (let i = 0; i < spheres.length; i++) {
            spheres[i].update();
            spheres[i].display();
        }
    };

    class Sphere {
        constructor(x, y, r, c) {
            this.pos = p5.createVector(x, y);
            this.radius = r;
            this.color = c;
            this.off = off;
            this.speed = speed;
            this.maxRadius = r * maxRadius;
            this.minRadius = r;
            this.direction = high.random(-1, 1);
            this.rotation = 0;
            this.rotationSpeed = rotationSpeed;
        }
        update() {
            this.off += this.speed;
            this.radius = p5.map(
                p5.noise(this.off),
                0,
                1,
                this.minRadius,
                this.maxRadius
            );
            this.rotation += this.direction * this.rotationSpeed;
        }
        display() {
            p5.push();
            p5.translate(this.pos.x, this.pos.y);
            p5.rotate(this.rotation);
            segments = segmentPickedNumber;
            let angle = p5.TWO_PI / segments;
            p5.beginShape(p5.TRIANGLE_FAN);
            p5.fill(this.color[0], this.color[1], this.color[2], 100);
            p5.vertex(0, 0);
            for (let i = 0; i <= segments; i++) {
                let x = p5.cos(i * angle) * this.radius;
                let y = p5.sin(i * angle) * this.radius;
                let c = p5.map(i, 0, segments, 0, 1);
                p5.fill(
                    p5.lerpColor(
                        p5.color(this.color[0], this.color[1], this.color[2], 0),
                        p5.color(this.color[0], this.color[1], this.color[2], 255),
                        c
                    )
                );
                p5.vertex(x, y);
            }
            p5.endShape();
            p5.pop();
        }
    }


};

export async function getServerSideProps(context) {
    const { tokenId } = context.params;

    // Ethers.js ile provider ve kontrat tanımlayın
    const provider = new ethers.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_PROVIDER}`);
    const FishContract = process.env.FISH_CONTRACT;
    const contract = new ethers.Contract(FishContract, FishABI, provider);
    // Akıllı kontrattan token verilerini çekin
    console.log("SSRID" + tokenId)
    let tokenHash;
    try {
        tokenHash = await contract.getTokenHash(tokenId)
    } catch (error) {
        console.error('Error fetching token data:', error);
        return {
            notFound: true,
        };
    }

    // userData'yı JSON formatına çevirin
    // tokenHash = JSON.parse(JSON.stringify(tokenHash));

    // Eğer veri bulunamazsa 404 sayfası döndürün
    if (!tokenHash) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            tokenHash,
        },
    };
}

export default function TokenPage({ tokenHash }) {


    return (
        <div className="w-screen h-screen dark-bg-taiko flex" >
            <div className="h container mx-auto px-4 flex items-center justify-center " >
                <NextReactP5Wrapper sketch={(p5) => sketch(p5, tokenHash)} />
            </div>
        </div>
    );
}