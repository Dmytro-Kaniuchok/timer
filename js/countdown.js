document.addEventListener("DOMContentLoaded", () => {
  const countdownDisplay = document.getElementById("countdownDisplay");
  const inputHours = document.getElementById("inputHours");
  const inputMinutes = document.getElementById("inputMinutes");
  const inputSeconds = document.getElementById("inputSeconds");

  const hoursLabel = document.getElementById("hoursLabel");
  const minutesLabel = document.getElementById("minutesLabel");
  const secondsLabel = document.getElementById("secondsLabel");

  const startBtn = document.getElementById("startCountdownBtn");
  const stopBtn = document.getElementById("stopCountdownBtn");
  const resetBtn = document.getElementById("resetCountdownBtn");

  let countdownInterval;
  let remainingTime = 0; // у секундах
  let alarmSound; // звук сигналу

  // оновлюємо значення під час руху повзунків
  inputHours.addEventListener("input", () => {
    hoursLabel.textContent = inputHours.value;
  });
  inputMinutes.addEventListener("input", () => {
    minutesLabel.textContent = inputMinutes.value;
  });
  inputSeconds.addEventListener("input", () => {
    secondsLabel.textContent = inputSeconds.value;
  });

  // ✅ форматування часу
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    countdownDisplay.textContent = formatTime(remainingTime);
  }

  updateDisplay();

  startBtn.addEventListener("click", () => {
    if (!alarmSound) {
      alarmSound = new Audio("alarm.mp3"); // створюємо після першого кліку
    }

    if (countdownInterval) return;

    if (remainingTime === 0) {
      const h = parseInt(inputHours.value) || 0;
      const m = parseInt(inputMinutes.value) || 0;
      const s = parseInt(inputSeconds.value) || 0;
      remainingTime = h * 3600 + m * 60 + s;
    }

    if (remainingTime <= 0) return;

    countdownInterval = setInterval(() => {
      remainingTime--;
      updateDisplay();

      // Ефект пульсу в останні 5 секунд
      if (remainingTime <= 5 && remainingTime > 0) {
        countdownDisplay.classList.add("pulse");
      } else {
        countdownDisplay.classList.remove("pulse");
      }

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        remainingTime = 0;
        updateDisplay();
        countdownDisplay.classList.remove("pulse");
        showMessage("Час вийшов! ⏰");

        if (alarmSound) {
          alarmSound.currentTime = 0;
          alarmSound.play();
        }
      }
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    remainingTime = 0;
    updateDisplay();
    inputHours.value = "0";
    inputMinutes.value = "0";
    inputSeconds.value = "0";
    hoursLabel.textContent = "0";
    minutesLabel.textContent = "0";
    secondsLabel.textContent = "0";
  });

  function showMessage(msg) {
    const message = document.getElementById("countdownMessage");
    message.textContent = msg;
    message.classList.add("show");
    setTimeout(() => {
      message.classList.remove("show");
    }, 2500);
  }
});
