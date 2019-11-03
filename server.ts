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
  const image = await loadImage('image2.jpg');
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const net = await posenet.load();
  const pose = await net.estimateSinglePose(canvas as unknown as HTMLCanvasElement);
    const connectedJoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0);
    console.log(pose.keypoints);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  connectedJoints.forEach(points => {
    ctx.moveTo(points[0].position.x, points[0].position.y);
    ctx.lineTo(points[1].position.x, points[1].position.y);
      ctx.stroke();
  });
    let lSquat = false;
    const leftHipX = Math.floor(pose.keypoints[11].position.x);
    const leftHipY = Math.floor(pose.keypoints[11].position.y);
    const leftKneeX = Math.floor(pose.keypoints[13].position.x);
    const leftKneeY = Math.floor(pose.keypoints[13].position.y);
    const leftAnkleX = Math.floor(pose.keypoints[15].position.x);
    const leftAnkleY = Math.floor(pose.keypoints[15].position.y);
    let leftThigh = Math.sqrt(Math.pow(leftHipX - leftKneeX, 2) + Math.pow(leftHipY - leftKneeY, 2));
    let leftShin = Math.sqrt(Math.pow(leftAnkleX - leftKneeX, 2) + Math.pow(leftAnkleY - leftKneeY, 2));
    let left = Math.sqrt(Math.pow(leftHipX - leftAnkleX, 2) + Math.pow(leftHipY - leftAnkleY, 2));
    if (Math.acos((Math.pow(leftThigh, 2) + Math.pow(leftShin, 2)
        - Math.pow(left, 2)) / (2 * leftThigh * leftShin)) < Math.PI/2) {
        lSquat = true;
    }
    console.log(Math.acos((Math.pow(leftThigh, 2) + Math.pow(leftShin, 2)
        - Math.pow(left, 2)) / (2 * leftThigh * leftShin)));
    console.log(lSquat);
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
