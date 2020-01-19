"use strict";
exports.__esModule = true;
function getRightKneeAngle(pose) {
    var RHipX = Math.floor(pose.keypoints[12].position.x);
    var RHipY = Math.floor(pose.keypoints[12].position.y);
    var RKneeX = Math.floor(pose.keypoints[14].position.x);
    var RKneeY = Math.floor(pose.keypoints[14].position.y);
    var RAnkleX = Math.floor(pose.keypoints[16].position.x);
    var RAnkleY = Math.floor(pose.keypoints[16].position.y);
    var rThigh = Math.sqrt(Math.pow(RHipX - RKneeX, 2) + Math.pow(RHipY - RKneeY, 2));
    var rShin = Math.sqrt(Math.pow(RAnkleX - RKneeX, 2) + Math.pow(RAnkleY - RKneeY, 2));
    var rightHypotenuse = Math.sqrt(Math.pow(RHipX - RAnkleX, 2) + Math.pow(RHipY - RAnkleY, 2));
    var theta = Math.acos((Math.pow(rThigh, 2) + Math.pow(rShin, 2) - Math.pow(rightHypotenuse, 2)) / (2 * rThigh * rShin));
    theta = Math.floor((100 * theta * 180) / Math.PI) / 100;
    return theta;
}
function getLeftKneeAngle(pose) {
    var lHipX = Math.floor(pose.keypoints[11].position.x);
    var lHipY = Math.floor(pose.keypoints[11].position.y);
    var lKneeX = Math.floor(pose.keypoints[13].position.x);
    var lKneeY = Math.floor(pose.keypoints[13].position.y);
    var lAnkleX = Math.floor(pose.keypoints[15].position.x);
    var lAnkleY = Math.floor(pose.keypoints[15].position.y);
    var lThigh = Math.sqrt(Math.pow(lHipX - lKneeX, 2) + Math.pow(lHipY - lKneeY, 2));
    var lShin = Math.sqrt(Math.pow(lAnkleX - lKneeX, 2) + Math.pow(lAnkleY - lKneeY, 2));
    var leftHypotenuse = Math.sqrt(Math.pow(lHipX - lAnkleX, 2) + Math.pow(lHipY - lAnkleY, 2));
    var theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lShin, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lShin));
    theta = Math.floor((100 * theta * 180) / Math.PI) / 100;
    return theta;
}
function getLeftHipAngle(pose) {
    var lHipX = Math.floor(pose.keypoints[11].position.x);
    var lHipY = Math.floor(pose.keypoints[11].position.y);
    var lKneeX = Math.floor(pose.keypoints[13].position.x);
    var lKneeY = Math.floor(pose.keypoints[13].position.y);
    var lShoulderX = Math.floor(pose.keypoints[5].position.x);
    var lShoulderY = Math.floor(pose.keypoints[5].position.y);
    var lThigh = Math.sqrt(Math.pow(lHipX - lKneeX, 2) + Math.pow(lHipY - lKneeY, 2));
    var lAbdomen = Math.sqrt(Math.pow(lShoulderX - lHipX, 2) + Math.pow(lShoulderY - lHipY, 2));
    var leftHypotenuse = Math.sqrt(Math.pow(lKneeX - lShoulderX, 2) + Math.pow(lKneeY - lShoulderY, 2));
    var theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lAbdomen, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lAbdomen));
    theta = Math.floor((100 * theta * 180) / Math.PI) / 100;
    return theta;
}
function getRightHipAngle(pose) {
    var rHipX = Math.floor(pose.keypoints[12].position.x);
    var rHipY = Math.floor(pose.keypoints[12].position.y);
    var rKneeX = Math.floor(pose.keypoints[14].position.x);
    var rKneeY = Math.floor(pose.keypoints[14].position.y);
    var rShoulderX = Math.floor(pose.keypoints[6].position.x);
    var rShoulderY = Math.floor(pose.keypoints[6].position.y);
    var lThigh = Math.sqrt(Math.pow(rHipX - rKneeX, 2) + Math.pow(rHipY - rKneeY, 2));
    var lAbdomen = Math.sqrt(Math.pow(rShoulderX - rHipX, 2) + Math.pow(rShoulderY - rHipY, 2));
    var leftHypotenuse = Math.sqrt(Math.pow(rKneeX - rShoulderX, 2) + Math.pow(rKneeY - rShoulderY, 2));
    var theta = Math.acos((Math.pow(lThigh, 2) + Math.pow(lAbdomen, 2) - Math.pow(leftHypotenuse, 2)) / (2 * lThigh * lAbdomen));
    theta = Math.floor((100 * theta * 180) / Math.PI) / 100;
    console.log("rhip", rHipX);
    console.log("rknee", rKneeX);
    return theta;
}
// determines from what general angle the subject is being filmed at
function squatView(pose) {
    // determine whether image is from side or front perspective [x]
    // find way to scale image up to set resolution [x]
    var leftKneeAngle = getLeftKneeAngle(pose);
    var rightKneeAngle = getRightKneeAngle(pose);
    var leftHipAngle = getLeftHipAngle(pose);
    var rightHipAngle = getRightHipAngle(pose);
    var rHipX = Math.floor(pose.keypoints[12].position.x);
    var rKneeX = Math.floor(pose.keypoints[14].position.x);
    var lHipX = Math.floor(pose.keypoints[11].position.x);
    var lKneeX = Math.floor(pose.keypoints[13].position.x);
    if (rHipX < rKneeX) {
        // when the subjects right hip is to the left of its knee, we can say the picture was taken 
        // on the left side of the subject
        return -2;
    }
    else if (lHipX > lKneeX) {
        // the subjects picture was on the right side 
        return 2;
    }
    else if (rightKneeAngle > 90 && rightHipAngle > 90 &&
        leftKneeAngle <= 90 && leftHipAngle <= 90) {
        // this represents a picture taken a little to the left of the subject
        return -1;
    }
    else if (leftKneeAngle > 90 && leftHipAngle > 90 &&
        rightKneeAngle <= 90 && rightHipAngle <= 90) {
        // picture is a little to the right of subject
        return 1;
    }
    else {
        // let 0 represent a completely front facing view of subject
        // if neither condition is true than we assume front facing
        return 0;
    }
}
function Confidence(pose){
    const leftShoulder = pose.keypoints[5].score;
    const rightShoulder = pose.keypoints[6].score;
    const leftHip = pose.keypoints[11].score;
    const rightHip = pose.keypoints[12].score;
    const leftKnee = pose.keypoints[13].score;
    const rightKnee = pose.keypoints[14].score;
    const leftAnkle = pose.keypoints[15].score;
    const rightAnkle = pose.keypoints[16].score;
const LeftLowest = Math.min(leftShoulder,leftHip,leftKnee,leftAnkle);
const RightLowest = Math.min(rightShoulder,rightHip,rightKnee,rightAnkle);
const lowest = Math.min(RightLowest,LeftLowest);
return lowest;
}

function isSquat(pose) {
    if(Confidence(pose)<0.8)return false;
    var leftKneeAngle = getLeftKneeAngle(pose);
    var rightKneeAngle = getRightKneeAngle(pose);
    var leftHipAngle = getLeftHipAngle(pose);
    var rightHipAngle = getRightHipAngle(pose);
    var view = squatView(pose);
    console.log(pose);
    console.log("left knee angle: ", leftKneeAngle, "\nright knee angle: ", rightKneeAngle, "\nleft hip angle: ", leftHipAngle, "\nright hip angle: ", rightHipAngle, "\nview: ", view);
    if (view == 0) {
        if (leftKneeAngle < 90 && rightKneeAngle < 90 && leftHipAngle < 90 && rightHipAngle < 90) {
            return true;
        }
        else
            return false;
    }
    else if (Math.abs(view) == 1) {
        if (view == -1) {
            if (leftKneeAngle < 75 && leftHipAngle < 75) {
                return true;
            }
            else
                return false;
        }
        else {
            if (rightKneeAngle < 75 && rightHipAngle < 75) {
                return true;
            }
            else
                return false;
        }
    }
    else if (Math.abs(view) == 2) {
        if (leftKneeAngle < 75 || rightKneeAngle < 75) {
            return true;
        }
        else
            return false;
    }
}
exports["default"] = isSquat;
