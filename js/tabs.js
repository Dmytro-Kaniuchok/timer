const stopwatchContainer = document.getElementById("stopwatchContainer");
const countdownContainer = document.getElementById("countdownContainer");

const showStopwatchBtn = document.getElementById("showStopwatch");
const showCountdownBtn = document.getElementById("showCountdown");

showStopwatchBtn.addEventListener("click", () => {
  stopwatchContainer.classList.add("active");
  countdownContainer.classList.remove("active");

  showStopwatchBtn.classList.add("active");
  showCountdownBtn.classList.remove("active");
});

showCountdownBtn.addEventListener("click", () => {
  countdownContainer.classList.add("active");
  stopwatchContainer.classList.remove("active");

  showCountdownBtn.classList.add("active");
  showStopwatchBtn.classList.remove("active");
});
