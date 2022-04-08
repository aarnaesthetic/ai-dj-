song="";
leftWristX=0;
leftWristY=0;
rightWristx=0;
rightWristy=0;
function preload()
{
song= loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO)
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized')
}

function gotPoses(results)
{
    if(results.length > 0)
    {
     console.log(results);
     scoreLeftWrist= results[0].pose.keypoints[9].score;      
     console.log("scoreLeftWrist= "+ scoreLeftWrist);
     scorerightWrist= results[0].pose.keypoints[10].score;      
     console.log("scorerightWrist= "+ scorerightWrist);
     
     leftWristX= results[0].pose.leftWrist.x;
     leftWristY= results[0].pose.leftWrist.y;
     console.log("Left Wrist x= "+ leftWristX+" Left Wrist Y= "+leftWristY)
     rightWristx= results[0].pose.rightWrist.x;
     rightWristy=results[0].pose.rightWrist.y;
     console.log("Right Wrist X= "+rightWristx+" Right Wrist Y= "+rightWristy);

    }
}

function draw()
{
    image(video,0,0,600,500)

    fill("#CD5C5C");
    stroke("#CD5C5C");

    if(scorerightWrist > 0.2)
    {
    circle(rightWristx,rightWristy,20);
    if(rightWristy >0 && rightWristy <=100 )
    {
        document.getElementById("speed").innerHTML= "Speed=0.5x"
        song.rate(0.5)

    }
    else if(rightWristy >100 && rightWristy <=200 )
    {
        document.getElementById("speed").innerHTML= "Speed=1x"
        song.rate(1)

    }
    else if(rightWristy >200 && rightWristy <=300 )
    {
        document.getElementById("speed").innerHTML= "Speed=1.5x"
        song.rate(1.5)

    }
    else if(rightWristy >300 && rightWristy <=400 )
    {
        document.getElementById("speed").innerHTML= "Speed=2x"
        song.rate(2)

    }
    else if(rightWristy >400 && rightWristy <=500 )
    {
        document.getElementById("speed").innerHTML= "Speed=2.5x"
        song.rate(2.5)

    }
}




    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftwristY = Number(leftWristY);
    remove_decimal=floor(InNumberleftwristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML= "Volume is= " + volume                                                                                                     ;
    song.setVolume(volume)
}   

}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

