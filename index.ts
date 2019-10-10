import * as posenet from '@tensorflow-models/posenet';
import { createCanvas, loadImage } from 'canvas';

// ideally use this optimized node backend but can't get this to work
//require('@tensorflow/tfjs-node');

const estimate = async (path: string) => {
  const net = await posenet.load();
  const image = await loadImage(path);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
  const pose = await net.estimateSinglePose(canvas as unknown as HTMLCanvasElement);
  console.log(pose);
}

const source = 'image.jpg';
estimate(source);
