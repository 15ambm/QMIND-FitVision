import express from 'express';
import _ from 'lodash';
import * as posenet from '@tensorflow-models/posenet';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import isSquat from "./math";

const app = express();
const PORT = 8080;
let ctr = 0;

// ideally use this optimized node backend but can't get this to work
//require('@tensorflow/tfjs-node');

app.use(express.json());

app.get('/', async (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
    const pose: posenet.Pose = req.body;
    res.send(pose);
})

app.get("/image", async (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    const image = await loadImage('image2.jpg');
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
  
    const net = await posenet.load();
    const pose = await net.estimateSinglePose(canvas as unknown as HTMLCanvasElement);
    const connectedJoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0);

    let squat = isSquat(pose);
  
    if(squat){
        ctx.strokeStyle = 'green';
    } else {
        ctx.strokeStyle = 'blue';
    }

    ctx.lineWidth = 3;
    connectedJoints.forEach(points => {
        if(points[0].score > 0.8 && points[1].score > 0.8) {
            ctx.moveTo(points[0].position.x, points[0].position.y);
            ctx.lineTo(points[1].position.x, points[1].position.y);
            ctx.stroke();
        }
    });
  
    canvas.createPNGStream().pipe(res);
});

app.get('/math.js', async (_req, res) => {
    res.sendFile(path.join(__dirname, 'math.js'));
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

