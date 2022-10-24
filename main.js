function handleSoundVideo(so, vi) {
  const option = {
    audio: so,
    video: vi,
  };
  return option;
}

function openStream() {
  return navigator.mediaDevices.getUserMedia(handleSoundVideo(true, true));
}

function playStream(idVideo, stream) {
  const video = document.getElementById(idVideo);
  video.srcObject = stream;
  video.play();
}

var peer = new Peer();
peer.on("open", (id) => $("#idPeer").append(id));

let localStream;

$("#call").click(() => {
  const id = $("#remoteid").val();
  openStream().then((stream) => {
    localStream = stream;
    playStream("video1", stream);
    const call = peer.call(id, stream);
    call.on("stream", (remoteStream) => playStream("video2", remoteStream));
  });
});

peer.on("call", (call) => {
  openStream().then((stream) => {
    playStream("video1", stream);
    call.answer(stream);
    call.on("stream", (remoteStream) => playStream("video2", remoteStream));
  });
});
let stateVideo = true;
$("#signup").click(() => {
  if (stateVideo) {
    localStream.getVideoTracks()[0].enabled = false;
    stateVideo = false;
  } else {
    localStream.getVideoTracks()[0].enabled = true;
    stateVideo = true;
  }
});
let stateSound = true;
$("#signup2").click(() => {
  if (stateSound) {
    localStream.getAudioTracks()[0].enabled = false;
    stateSound = false;
  } else {
    localStream.getAudioTracks()[0].enabled = true;
    stateSound = true;
  }
});
