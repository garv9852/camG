let db;
let openRequest=indexedDB.open("mydb");
openRequest.addEventListener("success",function(e){
    console.log("DB SUCCESS");
    db=openRequest.result;
})
openRequest.addEventListener("error",function(e){
    console.log("DB error");
})
openRequest.addEventListener("upgradeneeded",function(e){
    console.log("DB upgrader");
    db=openRequest.result;
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});
})