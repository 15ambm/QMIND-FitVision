import { Pose } from "@tensorflow-models/posenet";
function View(pose: Pose) {
    // determine whether image is from side or front perspective [x]
    // find way to scale image up to set resolution [x]
    let view = "Undetermined";
    if (Math.abs(pose.keypoints[11].position.x - pose.keypoints[12].position.x) > 80) {
        view = 'front';
    } else if (Math.abs(pose.keypoints[11].position.x - pose.keypoints[12].position.x) < 30) {
        view = 'side';
    }
    return view;
}

function Resize(iw: number, ih: number) {
    const scale = Math.min((1100 / iw), (1100 / ih));
    const iwScaled = iw * scale;
    const ihScaled = ih * scale;
    return { iwScaled, ihScaled };
}

export { Resize, View };
