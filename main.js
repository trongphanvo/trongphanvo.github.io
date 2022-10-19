

function openStream(){
    return navigator.mediaDevices.getUserMedia({audio: true, video: true});
}

function playStream(idVideo, stream) {
    const video = document.getElementById(idVideo);
    video.srcObject= stream
    video.play()
}

var peer = new Peer();
peer.on('open', id=> $('#idPeer').append(id)) 

$('#call').click(()=>{
    const id = $('#remoteid').val()
    openStream().then(stream => {
        playStream('video1',stream)
        const call = peer.call(id,stream)
        call.on('stream', remoteStream=> playStream('video2',remoteStream))
    })
})

peer.on('call', call =>{
    openStream().then(stream =>{
       playStream('video1',stream)
        call.answer(stream)
        call.on('stream', remoteStream=> playStream('video2',remoteStream))
    })
})


$('#signup').click(()=>{
    
})