// Helper function to get the language mode
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, addDoc, collection, } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyDINh2pIV631a--AtygTDkmqeEi5PAnsVg",
    authDomain: "hackfusion-c831d.firebaseapp.com",
    databaseURL: "https://hackfusion-c831d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackfusion-c831d",
    storageBucket: "hackfusion-c831d.appspot.com",
    messagingSenderId: "131044666281",
    appId: "1:131044666281:web:da10868a523bb5cd1d72b8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebase);
function getMode(language) {
    switch (language) {
        case 'python': return 'python';
        case 'cpp': return 'text/x-c++src';
        case 'java': return 'text/x-java';
        case 'php': return 'application/x-httpd-php';
        case 'ruby': return 'ruby';
        case 'htmlmixed': return 'htmlmixed';
        case 'css': return 'css';
        case 'sql': return 'text/x-sql';
        case 'javascript':
        default: return 'javascript';
    }
}

// Function to save editor content to localStorage
function saveToLocalStorage(editor, key) {
    localStorage.setItem(key, editor.getValue());
}

// Function to load editor content from localStorage
function loadFromLocalStorage(editor, key) {
    const savedCode = localStorage.getItem(key);
    if (savedCode) {
        editor.setValue(savedCode);
    }
}

// Initialize CodeMirror editors and load content from localStorage
const editor1 = CodeMirror.fromTextArea(document.getElementById('editor1'), {
    lineNumbers: true,
    theme: 'dracula',
    mode: getMode(document.getElementById('language1').value)
});
loadFromLocalStorage(editor1, 'code1');

const editor2 = CodeMirror.fromTextArea(document.getElementById('editor2'), {
    lineNumbers: true,
    theme: 'dracula',
    mode: getMode(document.getElementById('language2').value)
});
loadFromLocalStorage(editor2, 'code2');

const editor3 = CodeMirror.fromTextArea(document.getElementById('editor3'), {
    lineNumbers: true,
    theme: 'dracula',
    mode: getMode(document.getElementById('language3').value)
});
loadFromLocalStorage(editor3, 'code3');

const editor4 = CodeMirror.fromTextArea(document.getElementById('editor4'), {
    lineNumbers: true,
    theme: 'dracula',
    mode: getMode(document.getElementById('language4').value)
});
loadFromLocalStorage(editor4, 'code4');

// Save the content to localStorage when the editor content changes
editor1.on('change', function () {
    saveToLocalStorage(editor1, 'code1');
});
editor2.on('change', function () {
    saveToLocalStorage(editor2, 'code2');
});
editor3.on('change', function () {
    saveToLocalStorage(editor3, 'code3');
});
editor4.on('change', function () {
    saveToLocalStorage(editor4, 'code4');
});

// Update editor mode when language selection changes
document.getElementById('language1').addEventListener('change', function () {
    editor1.setOption('mode', getMode(this.value));
});
document.getElementById('language2').addEventListener('change', function () {
    editor2.setOption('mode', getMode(this.value));
});
document.getElementById('language3').addEventListener('change', function () {
    editor3.setOption('mode', getMode(this.value));
});
document.getElementById('language4').addEventListener('change', function () {
    editor4.setOption('mode', getMode(this.value));
});

// Handle form submission
document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the page from refreshing
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const code1 = editor1.getValue();
    const code2 = editor2.getValue();
    const code3 = editor3.getValue();
    const code4 = editor4.getValue();

    // Save data to Firebase Firestore
    addDoc(collection(db, "submissions"), {
        name: name,
        email: email,
        mobile: mobile,
        code1: code1,
        code2: code2,
        code3: code3,
        code4: code4,
        timestamp: new Date()
    })
        .then(function () {
            console.log("submission successfull");
            // Clear localStorage after successful submission
            localStorage.removeItem('code1');
            localStorage.removeItem('code2');
            localStorage.removeItem('code3');
            localStorage.removeItem('code4');
            editor1.setValue('');
            editor2.setValue('');
            editor3.setValue('');
            editor4.setValue('');
            exitFullscreen();
            document.querySelector(".thank-you").style.display = "flex";
            document.querySelector(".container").style.display = "none";
            localStorage.setItem("sts", "submitted");
        })
        .catch(function (error) {
            console.error("Error submitting data: ", error);
            alert("Test not submitted!")
        });
});

// Timer and exam start time functionality

// Set the specific exam start time
// const examStartTime = new Date('2024-09-29T14:30:00');

// function startExam() {
//     const currentTime = new Date();
//     if (currentTime >= examStartTime) {
//         // Start the exam immediately
//         requestFullscreen();
//         const elapsedTime = Math.floor((currentTime - examStartTime) / 1000);
//         const remainingTime = Math.max(3600 - elapsedTime, 0); // 3600 seconds = 1 hour
//         startTimer(remainingTime);
//     } else {
//         // Set a timeout to start the exam at the correct time
//         const timeUntilStart = examStartTime - currentTime;
//         setTimeout(() => {
//             alert('The exam is starting now. Please enter full-screen mode.');
//             requestFullscreen();
//             startTimer(3600); // Start with full 1 hour when exam begins
//         }, timeUntilStart);

//         // Display a message about when the exam will start
//         const minutesUntilStart = Math.ceil(timeUntilStart / 60000);
//         alert(`The exam will start in approximately ${minutesUntilStart} minutes. You will need to enter full-screen mode when it begins.`);
//     }
// }

// Function to request full-screen mode
// Function to request full-screen mode
function goFullscreen() {
    const elem = document.body; // or document.body for simplicity

    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => {
            console.log("Entered fullscreen mode.");
            return true;
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
        return true;
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
        return true;
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
        return true;
    }
}

// Function to exit full-screen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
            console.log("Exited fullscreen mode.");
        }).catch(err => {
            console.error(`Error exiting fullscreen: ${err.message}`);
        });
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}


// Function to check full-screen status
function isFullscreen() {
    return (
        document.fullscreenElement ||   // Standard
        document.webkitFullscreenElement || // Chrome, Safari, Opera
        document.mozFullScreenElement ||   // Firefox
        document.msFullscreenElement       // IE/Edge
    ) !== null;
}

// Function to start the countdown timer
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(function () {
        if (!isFullscreen()) {
            // Pause the timer if not in full-screen mode
            return;
        }

        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        // Display the timer
        timerElement.innerHTML =
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;

        // Check if time is up
        if (--timer < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            alert('Time is up! Submitting your solution.');
            autoSubmit();
            exitFullscreen();
        }
    }, 1000);
}

// Function to auto-submit the form
function autoSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const code1 = editor1.getValue();
    const code2 = editor2.getValue();
    const code3 = editor3.getValue();
    const code4 = editor4.getValue();

    // Auto-submit the data to Firebase Firestore
    addDoc(collection(db, "submissions"), {
        name: name,
        email: email,
        mobile: mobile,
        code1: code1,
        code2: code2,
        code3: code3,
        code4: code4,
        timestamp: new Date()
    })
        .then(function () {
            console.log("submission successfull");
            localStorage.removeItem('code1');
            localStorage.removeItem('code2');
            localStorage.removeItem('code3');
            localStorage.removeItem('code4');
            editor1.setValue('');
            editor2.setValue('');
            editor3.setValue('');
            editor4.setValue('');
            exitFullscreen();
            document.querySelector(".thank-you").style.display = "flex";
            document.querySelector(".container").style.display = "none";
            localStorage.setItem("sts", "submitted");
        })
        .catch(function (error) {
            console.error("Error submitting data: ", error);
            alert("Test not submitted!")
        });

}

document.getElementById('cnf-btn').addEventListener("click", Confirm);

function Confirm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;

    if (name === "" || email === "" || mobile === "") {
        alert("Please Fill out details!\nIncorrect details are subject to your negligence, We'll not be responsible for your disqualification! ");



    } else {
        document.getElementById('cnf-btn').innerHTML = "Loading..";
        setTimeout(() => {
            document.getElementById('cnf-btn').style.display = "none";
            document.querySelector('.check').style.display = "block";
        }, 1000);

        // Trigger full-screen mode
        goFullscreen();
        startTimer(3600);
        document.body.style.overflow = "auto";
        document.querySelector('.code-area').style.display = "block";
        document.getElementById("submitBtn").style.display = "block";
    }
}
document.body.onload = () => {
    Notification.requestPermission().then(permissioon => {
        if (permissioon === "granted") {
            console.log("Granted")
        }
        else {
            document.body.innerHTML = "Allow Notifications to start";
        }
    }).catch(err => {
        console.log(err);
    })
    if (localStorage.getItem('sts') === "submitted") {
        document.querySelector(".thank-you").style.display = "flex";
        document.querySelector(".container").style.display = "none";
    }
}
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === "hidden") {
        if (document.querySelector(".thank-you").style.display !== "flex") {
            const notify = new Notification("Tab Changed", {
                body: "Test submitted!",
                // tag:"Warning"
            })
        }
        if (document.querySelector(".thank-you").style.display !== "flex") {
            autoSubmit();
        }
    }
})
