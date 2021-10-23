let video = document.querySelector(".video-container video");
let constraints = {
    video: true,
    audio: false
}
let mediarecord;
let recordbtncont = document.querySelector(".record-container");
let recordbtn = document.querySelector(".record-btn");
let capturebtncont = document.querySelector(".capture-container");
let capturebtn = document.querySelector(".capture-btn");
let recordCheck = false
let chunks;
let transparentColor="transpparent"

navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    mediarecord = new MediaRecorder(stream);
    mediarecord.addEventListener("start", function (e) {
        chunks = [];
    })
    mediarecord.addEventListener("dataavailable", function (e) {
        chunks.push(e.data);
    })
    mediarecord.addEventListener("stop", function (e) {
        let nam = prompt("Video Name:")
        let blob = new Blob(chunks, {
            type: `video/mp4`
        });
        let videoUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = videoUrl;
        a.download = `${nam}.mp4`;
        a.click();
    })
})
recordbtncont.addEventListener('click', function () {
    if (!mediarecord) {
        alert("Your Camera is Disabled");
        return;
    }
    if (!recordCheck) {
        mediarecord.start();
        recordCheck = true;
        recordbtn.classList.add("scale-record");
        starttimer();
    } else {
        mediarecord.stop();
        recordCheck = false;
        recordbtn.classList.remove("scale-record");
        stoptimer();
    }
})

capturebtncont.addEventListener("click",function(e){
    capturebtn.classList.add("scale-capture");
    let canvas=document.createElement("canvas");
    canvas.width=video.videoWidth;
    canvas.height=video.videoHeight;
    let tool=canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    tool.fillStyle=transparentColor
    tool.fillRect(0,0,canvas.width,canvas.height);
    let imageURL=canvas.toDataURL();
    let a=document.createElement('a');
    a.href=imageURL;
    a.download="image.jpeg" ;
    a.click();

})

let timerid;
let timer = document.querySelector(".timer");
let count = 0
function starttimer() {
    document.querySelector(".timer-container").innerHTML = `<div class="timer">00:00:00</div>`;
    function displaytimer() {
        count++;
        let totalseconds=count;
        let hour=Number.parseInt(totalseconds/3600/10)==0?'0'+Number.parseInt(totalseconds/3600):Number.parseInt(totalseconds/3600);
        totalseconds=totalseconds%3600;
        let min=Number.parseInt(totalseconds/60/10)==0?'0'+Number.parseInt(totalseconds/60):Number.parseInt(totalseconds/60);
        let sec=Number.parseInt(totalseconds%60/10)==0?"0"+totalseconds%60:totalseconds%60;
        console.log(sec);
        document.querySelector(".timer").innerHTML = `<div class="timer">${hour}:${min}:${sec}</div>`;
        console.log(hour+" "+min+" "+sec+" "+timer);
    }
    timerid = setInterval(displaytimer, 1000);
}

function stoptimer() {
    clearInterval(timerid);
    document.querySelector(".timer-container").innerHTML = "";
    count=0;
}

let allfilter=document.querySelectorAll(".filter");
let fl=document.querySelector(".filter-layer");
allfilter.forEach(function(fil){
    fil.addEventListener("click",function(e){
        transparentColor=getComputedStyle(fil).getPropertyValue("background-color");
        fl.style.backgroundColor=transparentColor;
    })
})

