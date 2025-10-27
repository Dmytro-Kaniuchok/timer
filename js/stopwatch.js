let timer;
let centiseconds = 0; // соті секунди (00–99)
let seconds = 0;
let minutes = 0;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

// Форматування часу
function updateDisplay() {
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedCentiseconds = String(centiseconds).padStart(2, "0");
  display.textContent = `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
}

// Кнопки
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      centiseconds += 1;

      if (centiseconds >= 100) {
        centiseconds = 0;
        seconds++;
      }

      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }

      updateDisplay();
    }, 10);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${String(centiseconds).padStart(2, "0")}`;

    const li = document.createElement("li");

    li.textContent = formattedTime;

    lapsList.prepend(li);
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();

  lapsList.innerHTML = "";
});

updateDisplay();
