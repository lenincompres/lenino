
let poseNet;

/// posenet
function modelReady() {

}

function poseChanged(poses){
  //return;
  if(!poses[0]) return;
  let pose = poses[0].pose;
  
  if(pose.rightWrist.x < 0) return;
  if(pose.leftWrist.x < 0) return;
  if(pose.rightWrist.y < 0) return;
  if(pose.leftWrist.y < 0) return;
  if(pose.rightWrist.x > video.width) return;
  if(pose.leftWrist.x > video.width) return;
  if(pose.rightWrist.y > video.height) return;
  if(pose.leftWrist.y > video.height) return;
  
  const N = 6;
  let unit = N * dist(
    pose.rightShoulder.x, pose.rightShoulder.y,
    pose.leftShoulder.x, pose.leftShoulder.y
  );
  
  let center = createVector(
    (pose.leftShoulder.x + pose.rightShoulder.x)/2,
    (pose.leftShoulder.y + pose.rightShoulder.y)/2,
  );
  
  let left = createVector(pose.leftWrist.x, pose.leftWrist.y).sub(center);
  let right = createVector(pose.rightWrist.x, pose.rightWrist.y).sub(center);
  
  const D = (width + height) / 2;
  let pos = createVector(-(left.x + right.x)/2, (left.y + right.y)/2)
  pos = pos.mult(D/unit).add(width/2, height/2);
  
  let mag = left.sub(right).mag();
  mag = map(mag, 0, 1.5 * unit / N, 1, 0);
  mag = constrain(mag, 0, 1);
  if(mag) addPull(pos.x, pos.y, mag);
}