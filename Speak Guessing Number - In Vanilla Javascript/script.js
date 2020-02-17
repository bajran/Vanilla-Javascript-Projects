const msgEl = document.getElementById("msg");
const result = document.getElementsByClassName("box");

//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();

//SpeechRecognition property in windows Object
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start Recognition when the dom loads;
recognition.start();

//Capture user speaks
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMsg(msg);
  checkNumber(msg);
}

//Write what user speaks
function writeMsg(msg) {
  msgEl.innerHTML = ` <div>You said:</div>
                    <span class="box">${msg}</span>
                `;
}

//Check message against number
function checkNumber(msg) {
  const num = +msg;
  //Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div> That is not valid Number </div>";
    return;
  }

  //Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  //check Number
  if (num == randomNum) {
    document.body.innerHTML = `
            <h2>Congrats! You have guessed the number !<br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

//Recognition Result
recognition.addEventListener("result", onSpeak);

//End Speak Recognition service
recognition.addEventListener("end", () => {
  recognition.start();
});

//Reload the game
document.body.addEventListener("click", e => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
