let timers = [];
let timerInterval;
let currentTimerId = 0;

// Set button event listener
document.getElementById("setButton").addEventListener("click", startTimer);

function startTimer() {
  // Get values from the input fields
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid time");
    return;
  }

  // Disable the Set button and change text to Delete
  document.getElementById("setButton").textContent = "Delete";
  document.getElementById("setButton").removeEventListener("click", startTimer);
  document.getElementById("setButton").addEventListener("click", deleteTimer);

  // Store the timer details
  timers.push({
    id: currentTimerId++,
    hours,
    minutes,
    seconds,
    interval: null,
  });

  // Update the timers list
  renderTimers();
}

function renderTimers() {
  const timersList = document.getElementById("timers-list");
  timersList.innerHTML = ""; // Clear the previous list

  timers.forEach((timer, index) => {
    const timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-item");
    if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
      timerDiv.classList.add("finished");
      timerDiv.innerHTML = `
        <div class="time">Timer is up!</div>
        <button onclick="deleteTimer(${index})">Delete</button>
      `;
    } else {
      timerDiv.innerHTML = `
      <div class="time">Time Left :</div>
        <div class="time">${formatTime(timer)}</div>
        <button onclick="stopTimer(${index})">Stop</button>
      `;
    }
    timersList.appendChild(timerDiv);
  });
}

function formatTime(timer) {
  const hours = timer.hours.toString().padStart(2, "0");
  const minutes = timer.minutes.toString().padStart(2, "0");
  const seconds = timer.seconds.toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid time");
    return;
  }

  let id = timers.length;
  timers.push({
    id: id,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    interval: setInterval(() => updateTimer(id), 1000),
  });
}

function updateTimer(id) {
  let timer = timers[id];
  if (timer.seconds > 0) {
    timer.seconds--;
  } else if (timer.minutes > 0) {
    timer.minutes--;
    timer.seconds = 59;
  } else if (timer.hours > 0) {
    timer.hours--;
    timer.minutes = 59;
    timer.seconds = 59;
  } else {
    clearInterval(timer.interval);
    playAlert();
    timer.interval = null;
    timer.finished = true;
    renderTimers();
  }
  renderTimers();
}

function stopTimer(index) {
  clearInterval(timers[index].interval);
  timers.splice(index, 1);
  renderTimers();
}

function deleteTimer(index) {
  clearInterval(timers[index].interval);
  timers.splice(index, 1);
  renderTimers();
}

function playAlert() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav"); // Alert sound
  audio.play();
}
