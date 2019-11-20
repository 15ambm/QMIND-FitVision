import { getRAngle, getLAngle, isSquat } from './math';
import { View } from './camera';
import { Pose } from "@tensorflow-models/posenet";
function log(pose: Pose, ctr : number) {
    console.log(pose.keypoints);

    const lSide = getLAngle(pose);
    const rSide = getRAngle(pose);
    const lSquat = isSquat(lSide);
    const rSquat = isSquat(rSide);
    console.log("left angle: ", lSide, "\nright angle: ", rSide);
    if (View(pose) == 'front') {
        if (lSquat && rSquat) {
            console.log("This is a Squat!");
            ctr++;
        }
        else {
            console.log("Not a Squat!");
        }
    } else if (View(pose) == 'side') {
        if (lSquat || rSquat) {
            console.log("This is a Squat");
        } else {
            console.log("Not a Squat!");
        }
    }
    console.log(View(pose), " view");
    return ctr;
}

export { log }; 