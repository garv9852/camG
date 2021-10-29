setTimeout(function(){

    if(db){
        console.log("hello");
        let dbTransaction=db.transaction("video","readonly");
        let videoStore=dbTransaction.objectStore("video");
        let videoRequest=videoStore.getAll();
        videoRequest.onsuccess=function(e){
            let videoResult=videoRequest.result;
            let gallery=document.querySelector(".data-container");
            videoResult.forEach(function(vidob){
                let mediaElem=document.createElement('div');
                mediaElem.setAttribute("class","media-container");
                mediaElem.setAttribute("id",vidob.id);
                let url=URL.createObjectURL(vidob.blobdata);
                mediaElem.innerHTML=`
                    <div class="media">
                        <video autoplay loop src="${url}"></video>
                    </div>
                    <div class="material-icons download-btn">file_download</div>
                    <div class="material-icons delete-btn">delete</div>`;
                gallery.appendChild(mediaElem);
            })
        }


        dbTransaction=db.transaction("image","readonly");
        let imageStore=dbTransaction.objectStore("image");
        let imageRequest=imageStore.getAll();
        imageRequest.onsuccess=function(e){
            let imageResult=imageRequest.result;
            let gallery=document.querySelector(".data-container");
            imageResult.forEach(function(imob){
                let mediaElem=document.createElement('div');
                mediaElem.setAttribute("class","media-container");
                mediaElem.setAttribute("id",imob.id);
                let url=imob.url;
                mediaElem.innerHTML=`
                    <div class="media">
                        <img src="${url}"></img>
                    </div>
                    <div class="material-icons download-btn">file_download</div>
                    <div class="material-icons delete-btn">delete</div>`;
                gallery.appendChild(mediaElem);
            })
        }
    }
},100)
