leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
sound = "";
scoreLeftwrist = 0;
scoreRightwrist = 0;
function preload()
{
    sound  = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses);
} 

function modelLoaded()
{
    console.log("PoseNet is initialized!!!");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FFFF00");
    stroke("#FFFF00");
    if(scoreRightwrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
    
    if(rightWristY > 0 && rightWristY<= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        sound.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        sound.rate(1);
    }

    else if(rightWristY > 200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        sound.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        sound.rate(2);
    }

    else if(rightWristY > 400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x"
        sound.rate(2.5);
    }

    }
    
    if(scoreLeftwrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        IsNumberLeftWristY = Number(leftWristY);
        console.log(IsNumberLeftWristY);
        remove_decimals = floor(IsNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        sound.setVolume(volume);
    }
}

function play()
{
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + " y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + " y = " + leftWristY);
       
    }
}