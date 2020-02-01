
import { Pose } from "@tensorflow-models/posenet";
import { getLeftKneeAngle, getRightKneeAngle, getLeftHipAngle, getRightHipAngle, getRightArmPitAngle, getLeftArmPitAngle } from './math'


// determines from what general angle the subject is being filmed at
function squatView(pose: Pose) {
    // determine whether image is from side or front perspective [x]
    // find way to scale image up to set resolution [x]

    const leftKneeAngle = getLeftKneeAngle(pose);
    const rightKneeAngle = getRightKneeAngle(pose);
    const leftHipAngle = getLeftHipAngle(pose);
    const rightHipAngle = getRightHipAngle(pose);

    const rHipX = Math.floor(pose.keypoints[12].position.x);
    const rKneeX = Math.floor(pose.keypoints[14].position.x);

    const lHipX = Math.floor(pose.keypoints[11].position.x);
    const lKneeX = Math.floor(pose.keypoints[13].position.x);

    if(rHipX < rKneeX) {
        // when the subjects right hip is to the left of its knee, we can say the picture was taken 
        // on the left side of the subject
        return -2;
    } else if (lHipX > lKneeX) {
        // the subjects picture was on the right side 
        return 2;
    } else if (
        rightKneeAngle > 90 && rightHipAngle > 90 &&
        leftKneeAngle <= 90 && leftHipAngle <= 90) 
    {
        // this represents a picture taken a little to the left of the subject
        return -1;
    } else if (
        leftKneeAngle > 90 && leftHipAngle > 90 &&
        rightKneeAngle <= 90 && rightHipAngle <= 90) 
    {
        // picture is a little to the right of subject
        return 1;
    } else {
        // let 0 represent a completely front facing view of subject
        // if neither condition is true than we assume front facing
        return 0;
    }      
}


function isSquat(pose: Pose) {
    
    const leftKneeAngle = getLeftKneeAngle(pose);
    const rightKneeAngle = getRightKneeAngle(pose);
    const leftHipAngle = getLeftHipAngle(pose);
    const rightHipAngle = getRightHipAngle(pose);
    const view = squatView(pose);

    console.log(pose);
    console.log("left knee angle: ", leftKneeAngle, 
                "\nright knee angle: ", rightKneeAngle,
                "\nleft hip angle: ", leftHipAngle,
                "\nright hip angle: ", rightHipAngle,
                "\nview: ", view);

    if(view == 0) {
        if(leftKneeAngle < 75 && rightKneeAngle < 75 && leftHipAngle < 90 && rightHipAngle < 90) {
                return true;
            } else return false;
    } else if (Math.abs(view) == 1) {
        if(view == -1) {
            if(leftKneeAngle < 75 && leftHipAngle < 75) {
                return true;
            } else return false;
        } else {
            if(rightKneeAngle < 75 && rightHipAngle < 75) {
                return true;
            } else return false;
        }
    } else if(Math.abs(view) == 2) {

            if(leftKneeAngle < 75 || rightKneeAngle < 75) {
                return true;
            } else return false;
        
    }

}

function isOverHead(pose: Pose){
    const rightArmpitAngle = getRightArmPitAngle(pose);
    const leftArmpitAngle = getLeftArmPitAngle(pose);
    const view = squatView(pose);
   
    console.log(pose);
    console.log("left armpit angle: ", leftArmpitAngle, 
                "\nright armpit angle: ", rightArmpitAngle,
                "\nview: ", view);

                if ( rightArmpitAngle > 100 && rightArmpitAngle < 150 && leftArmpitAngle > 100 && leftArmpitAngle < 150){
                    return true;
                }
}

export { isSquat, isOverHead };
