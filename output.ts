import { getRAngle, getLAngle, isSquat } from './math';
import { View } from './camera';
import { Pose } from "@tensorflow-models/posenet";
function log(pose: Pose) {
    console.log(pose.keypoints);

    const lSide = getLAngle(pose);
    const rSide = getRAngle(pose);
    const lSquat = isSquat(lSide);
    const rSquat = isSquat(rSide);
    console.log("left angle: ", lSide, "\nright angle: ", rSide);

    if (lSquat && rSquat) {
        console.log("This Is A Squat!");
    } else if (lSquat) {
        console.log("Left Side Is Correct, Right Is Not");
    } else if (rSquat) {
        console.log("Right Side Is Correct, Left Is Not");
    } else {
        console.log("Not a Squat!");
    }

    console.log(View(pose), " view");
}

export { log }; 