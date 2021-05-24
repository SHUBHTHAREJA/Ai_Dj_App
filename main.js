//these 5 are varibles
song="";
leftwristX=0;
leftwristy=0;
rightwristX=0;
rightwristY=0;
scoreleftWrist=0;
scoreRightWrist=0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    //in these two we have create canvas and we have set the position of the canvas
    canvas=createCanvas(550,450);
    canvas.position(500,150)
    //in these two we have add webcam to our website and we have set the size of the webcam
    video=createCapture(VIDEO);
    video.hide();

     // loading poseNet
     poseNet=ml5.poseNet(video,modelLoaded);
     //running poseNet
     poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("model loaded");
}

function gotPoses(results){
    if (results.length > 0) {

        console.log(results);

        scoreleftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(scoreleftWrist);
        //in these two varibles we are holding the position of leftwrist
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX=",leftwristX,"leftwristY=",leftwristY);

        //in these two varibles we are holding the position of rightwrist
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwristX=",rightwristX,"rightwristY=",rightwristY);
    }
}

//in this function we have set the webcam in our website
function draw(){
    image(video,0,0,550,450);

    fill("#34ebe5");
    stroke("#34ebe5");
    if (scoreRightWrist > 0.2) {
        circle(rightwristX,rightwristY,20);

    if (rightwristY > 0 && rightwristY <=100) {
        document.getElementById("speed").innerHTML="speed=0.5"
        song.rate(0.5);
    } else if (rightwristY >100 && rightwristY <=200) {
        document.getElementById("speed").innerHTML="speed=1"
        song.rate(1); 
        
    }
    else if (rightwristY >200 && rightwristY <=300) {
        document.getElementById("speed").innerHTML="speed=1.5"
        song.rate(1.5); 
        
    }
    else if (rightwristY >300 && rightwristY <=400) {
        document.getElementById("speed").innerHTML="speed=2"
        song.rate(2); 
        
    }
}

    if (scoreleftWrist > 0.2) {
       circle(leftwristX,leftwristY,20);
       inNumberLeftWrist=Number(leftwristY);
       remove_decimals=floor(inNumberLeftWrist);
       volume=remove_decimals/400; 
       document.getElementById("volume").innerHTML="volume  "+volume;
       song.setVolume(volume);
    }
}
//in this function we have play the song,volume and it's speed
function play_song(){
 song.play();
 song.setVolume(1);
 song.rate(1);
}

