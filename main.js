let currentPlayer = null;
let timer1, timer2;

const clock1 = document.getElementById('clock1');
const clock2 = document.getElementById('clock2');
const randomNumberElement = document.getElementById('number');
const setupModal = document.getElementById('setup-modal');
const startButton = document.getElementById('start-button');
const timeInput = document.getElementById('time-input');
const waitInput = document.getElementById('wait-input');
let waitTime;

startButton.onclick = function() {
  waitTime = waitInput.value * 1000; // Convert to milliseconds
  clock1.textContent = clock2.textContent = `${timeInput.value.padStart(2, '0')}:00`;
  setupModal.style.display = 'none';
};

clock1.onclick = function() {
  if (currentPlayer !== 1) {
    currentPlayer = 1;
    timer1 = setInterval(updateClock, 1000);
    clearInterval(timer2);
  } else {
    clearInterval(timer1);
    generateRandomNumber();
    setTimeout(function() {
      currentPlayer = 2;
      timer2 = setInterval(updateClock, 1000);
    }, waitTime);
  }
};

clock2.onclick = function() {
  if (currentPlayer !== 2) {
    currentPlayer = 2;
    timer2 = setInterval(updateClock, 1000);
    clearInterval(timer1);
  } else {
    clearInterval(timer2);
    generateRandomNumber();
    setTimeout(function() {
      currentPlayer = 1;
      timer1 = setInterval(updateClock, 1000);
    }, waitTime);
  }
};

function updateClock() {
  if (currentPlayer === 1) {
    clock1.textContent = updateTime(clock1.textContent);
  } else if (currentPlayer === 2) {
    clock2.textContent = updateTime(clock2.textContent);
  }
}

function updateTime(timeString) {
  let [minutes, seconds] = timeString.split(':').map(Number);

  if (--seconds === -1) {
    if (--minutes === -1) {
      return '00:00';
    }
    seconds = 59;
  }

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function generateRandomNumber() {
  let num = Math.floor(Math.random() * 101);
  randomNumberElement.textContent = num;
}
