let is24Hour = false;
let isRunning = true;
let timerId = null;

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const formatBtn = document.getElementById("formatBtn");
const toggleBtn = document.getElementById("toggleBtn");

function updateClock() {
  const now = new Date();

  // Time format check
  let hours = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let period = "";

  if (!is24Hour) {
    period = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }
  hours = String(hours).padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}:${seconds}${period}`;

  // Date formatting
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  dateElement.textContent = now.toLocaleDateString(undefined, options);
}

function startClock() {
  updateClock();
  timerId = setInterval(updateClock, 1000);
}

function stopClock() {
  clearInterval(timerId);
}

// 12/24 hour switch
formatBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;
  formatBtn.textContent = is24Hour ? "Switch to 12-Hour" : "Switch to 24-Hour";
  updateClock();
});

// Pause / Resume
toggleBtn.addEventListener("click", () => {
  isRunning = !isRunning;
  if (isRunning) {
    startClock();
    toggleBtn.textContent = "Pause Clock";
    toggleBtn.className = "pause";
  } else {
    stopClock();
    toggleBtn.textContent = "Resume Clock";
    toggleBtn.className = "resume";
  }
});

startClock();