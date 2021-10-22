let video=document.querySelector(".video-container video");
let constraints={
    video:true,
    audio:false
}
let mediarecord;
let recordbtncont=document.querySelector(".record-container");
let recordbtn=document.querySelector(".record-btn");
let capturebtncont=document.querySelector(".capture-container");
let capturebtn=document.querySelector(".capture-btn");
let recordCheck=false

navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
    video.srcObject=stream;
    mediarecord=new MediaRecorder(stream);
})
recordbtncont.addEventListener('click',function(){
    if(!mediarecord) return;
    if(!recordCheck)
    {
        mediarecord.start();
        recordCheck=true;
        recordbtn.classList.add("scale-record");
    }
    else{
        mediarecord.stop();
        recordbtn.classList.remove("scale-record");
    }
})

