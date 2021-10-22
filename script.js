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
let chunks;

navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
    video.srcObject=stream;
    mediarecord=new MediaRecorder(stream);
    mediarecord.addEventListener("start",function(e){
        chunks=[];
    })
    mediarecord.addEventListener("dataavailable",function(e){
        chunks.push(e.data);
    })
    mediarecord.addEventListener("stop",function(e){
        let nam=prompt("Video Name:")
        let blob=new Blob(chunks,{type:`video/mp4`});
        let videoUrl=URL.createObjectURL(blob);
        let a=document.createElement('a');
        a.href=videoUrl;
        a.download=`${nam}.mp4`;
        a.click();
    })
})
recordbtncont.addEventListener('click',function(){
    if(!mediarecord) {
        alert("Your Camera is Disabled");
        return;
    }
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


