import express from 'express';
import * as posenet from '@tensorflow-models/posenet';
import { createCanvas, loadImage } from 'canvas';

// ideally use this optimized node backend but can't get this to work
//require('@tensorflow/tfjs-node');

const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  const image = await loadImage('image.jpg');
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const net = await posenet.load();
  const pose = await net.estimateSinglePose(canvas as unknown as HTMLCanvasElement);

  ctx.fillStyle = 'red';
  pose.keypoints.forEach(point => {
    ctx.fillRect(point.position.x, point.position.y, 5, 5);
  });

  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
