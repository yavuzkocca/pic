import { useContext, useRef, useEffect } from 'react';
import { DataContext } from "../components/DataContext";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import hl from '../constants/hl-gen2';

export function sketch(p5, userData1, setData, cata, setCata) {


    const high = hl(userData1)


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

    // TRAITS

    function Trait0(maxRadius) {
        if (maxRadius < 2) {
            return "short";
        } else {
            return "long";
        }
    }

    function Trait1(paletteTrait) {
        return paletteTrait;
    }

    function Trait2(off) {
        if (off < 333) {
            return "onSet";
        } else if (off < 666 && 334 < off) {
            return "maybeSet";
        } else {
            return "offSet";
        }
    }

    function Trait3(n) {
        if (n < 30) {
            return "Pleasantly Vacant";
        } else if (n < 75 && 29 < n) {
            return "Sparsely Sprinkled";
        } else if (n < 100 && 74 < n) {
            return "Moderately Amusing";
        } else if (n < 151 && 99 < n) {
            return "Densely Hilarious";
        } else if (n < 165 && 150 < n) {
            return "Uncomfortably Cozy";
        } else if (n < 175 && 164 < n) {
            return "Sassily Stifling";
        } else {
            return "Suffocatingly Stuffed";
        }
    }

    function Trait4(rotationSpeed) {
        if (rotationSpeed < 0.02) {
            return "forward";
        } else {
            return "onward";
        }
    }

    let traits = {
        "position": Trait0(maxRadius),
        "wenSet": Trait2(off),
        "stuffMeter": Trait3(n),
        "rotationSpeed": Trait4(rotationSpeed),
        "palette": Trait1(paletteTrait[colorPalletePicker]),
        "segment": segmentPickedTrait,
        "speed": speedPickedTrait,
    };
    console.log(JSON.stringify(traits));
    let name = `Wagasa #${userData1.userData?.tokenId}`;

    let description =
        `A limited-edition generative art collection featuring unique tree designs created with p5.js. Each piece blends technology and nature.`
        ;
    console.log(description)

    otherdata = {
        "name": name,
        "tokenId": `${userData1.userData?.tokenId}`,
        "description": description,
        "tokenHash": `${userData1.userData?.tokenHash}`,
        "attributes": traits
    }
    console.log("CATA" + cata)
    if (cata == false) {
        setData(otherdata);
        console.log("OTH" + JSON.stringify(otherdata))
        setCata(true);
    }
    console.log(otherdata)

};




export default function Wrapper(userData, dataRef) {
    const userData1 = userData
    const { data, setData, cata, setCata } = useContext(DataContext);


    console.log(`Wusr ${JSON.stringify(userData1)}`)
    console.log(`Wusr ${JSON.stringify(data)}`)

    if (!userData || !userData.userData) {

        return (
            <div className="container mx-auto px-4 flex items-center justify-center">

            </div>
        );
    }

    return (
        //style={{ display: 'none' }}
        <div id='wagasa' className="container mx-auto px-4 flex items-center justify-center" style={{ display: 'none' }} >
            <NextReactP5Wrapper sketch={(p5) => sketch(p5, userData1, setData, cata, setCata)} />
        </div>
    );
}