import { Pose } from "@tensorflow-models/posenet";

function getRAngle(pose: Pose) {
    const RHipX = Math.floor(pose.keypoints[12].position.x);
    const RHipY = Math.floor(pose.keypoints[12].position.y);
    const RKneeX = Math.floor(pose.keypoints[14].position.x);
    const RKneeY = Math.floor(pose.keypoints[14].position.y);
    const RAnkleX = Math.floor(pose.keypoints[16].position.x);
    const RAnkleY = Math.floor(pose.keypoints[16].position.y);
    let RThigh = Math.sqrt(Math.pow(RHipX - RKneeX, 2) + Math.pow(RHipY - RKneeY, 2));
    let RShin = Math.sqrt(Math.pow(RAnkleX - RKneeX, 2) + Math.pow(RAnkleY - RKneeY, 2));
    let right = Math.sqrt(Math.pow(RHipX - RAnkleX, 2) + Math.pow(RHipY - RAnkleY, 2));
    let RSide = Math.acos((Math.pow(RThigh, 2) + Math.pow(RShin, 2)
        - Math.pow(right, 2)) / (2 * RThigh * RShin));
    RSide = Math.floor((100 * RSide * 180) / Math.PI) / 100;
    return RSide;
}

function getLAngle(pose: Pose) {
    const lHipX = Math.floor(pose.keypoints[11].position.x);
    const lHipY = Math.floor(pose.keypoints[11].position.y);
    const lKneeX = Math.floor(pose.keypoints[13].position.x);
    const lKneeY = Math.floor(pose.keypoints[13].position.y);
    const lAnkleX = Math.floor(pose.keypoints[15].position.x);
    const lAnkleY = Math.floor(pose.keypoints[15].position.y);
    let lThigh = Math.sqrt(Math.pow(lHipX - lKneeX, 2) + Math.pow(lHipY - lKneeY, 2));
    let lShin = Math.sqrt(Math.pow(lAnkleX - lKneeX, 2) + Math.pow(lAnkleY - lKneeY, 2));
    let left = Math.sqrt(Math.pow(lHipX - lAnkleX, 2) + Math.pow(lHipY - lAnkleY, 2));
    let LSide = Math.acos((Math.pow(lThigh, 2) + Math.pow(lShin, 2)
        - Math.pow(left, 2)) / (2 * lThigh * lShin));
    LSide =Math.floor((100 * LSide * 180 ) / Math.PI)/100;
    return LSide;
}
function isSquat(angle: Number) {
    let Squat = false;
    if (angle < 92) {
        Squat = true;
    }
    return Squat;
}
export { getRAngle, getLAngle, isSquat };
