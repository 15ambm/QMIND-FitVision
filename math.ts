import { Pose } from "@tensorflow-models/posenet";

function getRightKneeAngle(pose: Pose) {
    const RHipX = Math.floor(pose.keypoints[12].position.x);
    const RHipY = Math.floor(pose.keypoints[12].position.y);
    const RKneeX = Math.floor(pose.keypoints[14].position.x);
    const RKneeY = Math.floor(pose.keypoints[14].position.y);
    const RAnkleX = Math.floor(pose.keypoints[16].position.x);
    const RAnkleY = Math.floor(pose.keypoints[16].position.y);
    let rThigh = Math.sqrt(Math.pow(RHipX - RKneeX, 2) + Math.pow(RHipY - RKneeY, 2));
    let rShin = Math.sqrt(Math.pow(RAnkleX - RKneeX, 2) + Math.pow(RAnkleY - RKneeY, 2));
    let rightHypotenuse = Math.sqrt(Math.pow(RHipX - RAnkleX, 2) + Math.pow(RHipY - RAnkleY, 2));
    let theta = Math.acos((Math.pow(rThigh, 2) + Math.pow(rShin, 2) - Math.pow(rightHypotenuse, 2)) / (2 * rThigh * rShin));
    theta = Math.floor((100 * theta * 180) / Math.PI) / 100;
    return theta;
}

function getLeftKneeAngle(pose: Pose) {
    const lHipX = Math.floor(pose.keypoints[11].position.x);
    const lHipY = Math.floor(pose.keypoints[11].position.y);
    const lKneeX = Math.floor(pose.keypoints[13].position.x);
    const lKneeY = Math.floor(pose.keypoints[13].position.y);
    const lAnkleX = Math.floor(pose.keypoints[15].position.x);
    const lAnkleY = Math.floor(pose.keypoints[15].position.y);
    let lThigh = Math.sqrt(Math.pow(lHipX - lKneeX, 2) + Math.pow(lHipY - lKneeY, 2));
    let lShin = Math.sqrt(Math.pow(lAnkleX - lKneeX, 2) + Math.pow(lAnkleY - lKneeY, 2));
    let leftHypotenuse = Math.sqrt(Math.pow(lHipX - lAnkleX, 2) + Math.pow(lHipY - lAnkleY, 2));
    let theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lShin, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lShin));
    theta =Math.floor((100 * theta * 180 ) / Math.PI)/100;
    return theta;
}

function getLeftHipAngle(pose: Pose) {
    const lHipX = Math.floor(pose.keypoints[11].position.x);
    const lHipY = Math.floor(pose.keypoints[11].position.y);
    const lKneeX = Math.floor(pose.keypoints[13].position.x);
    const lKneeY = Math.floor(pose.keypoints[13].position.y);
    const lShoulderX = Math.floor(pose.keypoints[5].position.x);
    const lShoulderY = Math.floor(pose.keypoints[5].position.y);
    let lThigh = Math.sqrt(Math.pow(lHipX - lKneeX, 2) + Math.pow(lHipY - lKneeY, 2));
    let lAbdomen = Math.sqrt(Math.pow(lShoulderX - lHipX, 2) + Math.pow(lShoulderY - lHipY, 2));
    let leftHypotenuse = Math.sqrt(Math.pow(lKneeX - lShoulderX, 2) + Math.pow(lKneeY - lShoulderY, 2));
    let theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lAbdomen, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lAbdomen));
    theta = Math.floor((100 * theta * 180 ) / Math.PI)/100;
    return theta;
}

function getRightHipAngle(pose: Pose) {
    const rHipX = Math.floor(pose.keypoints[12].position.x);
    const rHipY = Math.floor(pose.keypoints[12].position.y);
    const rKneeX = Math.floor(pose.keypoints[14].position.x);
    const rKneeY = Math.floor(pose.keypoints[14].position.y);
    const rShoulderX = Math.floor(pose.keypoints[6].position.x);
    const rShoulderY = Math.floor(pose.keypoints[6].position.y);
    let lThigh = Math.sqrt(Math.pow(rHipX - rKneeX, 2) + Math.pow(rHipY - rKneeY, 2));
    let lAbdomen = Math.sqrt(Math.pow(rShoulderX - rHipX, 2) + Math.pow(rShoulderY - rHipY, 2));
    let leftHypotenuse = Math.sqrt(Math.pow(rKneeX - rShoulderX, 2) + Math.pow(rKneeY - rShoulderY, 2));
    let theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lAbdomen, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lAbdomen));
    theta = Math.floor((100 * theta * 180 ) / Math.PI)/100;
    console.log("rhip", rHipX);
    console.log("rknee", rKneeX);
    return theta;
}

export { getLeftKneeAngle, getRightKneeAngle, getLeftHipAngle, getRightHipAngle }