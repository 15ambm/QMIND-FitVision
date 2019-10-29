import express from 'express';
import _ from 'lodash';
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
  const connectedJoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0);

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  connectedJoints.forEach(points => {
    ctx.moveTo(points[0].position.x, points[0].position.y);
    ctx.lineTo(points[1].position.x, points[1].position.y);
    ctx.stroke();
  });

  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
