import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD7Xcrs5ywIe9KPavSCg2xC_x2P2a3vHnE",
    authDomain: "api-project-723460605643.firebaseapp.com",
    databaseURL: "https://api-project-723460605643.firebaseio.com",
    projectId: "api-project-723460605643",
    storageBucket: "api-project-723460605643.appspot.com",
    messagingSenderId: "723460605643"
};
firebase.initializeApp(config);

const songDb = firebase.database().ref('songs');

var script = '';
var isRecording = false;

if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'cmn-Hans-CN';

    recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; i += 1) {
            if (event.results[i].isFinal) {
                script = event.results[i][0].transcript;
            }
        }
    }

    recognition.onend = function () {
        var startIndex = script.indexOf('') + 2;
        var songName = script.substr(startIndex);
        songDb.set(songName);
    }
}

document.getElementById('record-button').addEventListener('click', function () {
    isRecording = !isRecording;
    if (isRecording) {
        recognition.start();
    } else {
        recognition.stop();
    }
});
