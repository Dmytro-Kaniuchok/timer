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

  const progressCircle = document.querySelector(
    ".progress-circle circle.progress"
  );

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference;

  let countdownInterval;
  let remainingTime = 0;
  let totalTime = 0;
  let alarmSound;
  let endTime;

  // --- Оновлення кольору слайдерів ---
  function updateSlider(slider) {
    const value = slider.value;
    const max = slider.max;
    slider.style.background = `linear-gradient(to right, #26a69a 0%, #26a69a ${
      (value / max) * 100
    }%, #e0e0e0 ${(value / max) * 100}%)`;
  }

  [inputHours, inputMinutes, inputSeconds].forEach((slider) => {
    slider.addEventListener("input", () => {
      hoursLabel.textContent = inputHours.value;
      minutesLabel.textContent = inputMinutes.value;
      secondsLabel.textContent = inputSeconds.value;
      updateSlider(slider);
    });
    updateSlider(slider);
  });

  // Формат часу
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

  function updateProgress() {
    const now = Date.now();
    const timeLeft = Math.max(0, endTime - now);
    const progress = timeLeft / (totalTime * 1000);
    const offset = circumference - progress * circumference;
    progressCircle.style.strokeDashoffset = offset;

    if (remainingTime <= 5 && remainingTime > 0) {
      countdownDisplay.classList.add("warning");
      progressCircle.classList.add("warning");
    } else {
      countdownDisplay.classList.remove("warning");
      progressCircle.classList.remove("warning");
    }

    if (timeLeft > 0 && countdownInterval) {
      requestAnimationFrame(updateProgress);
    }
  }

  startBtn.addEventListener("click", () => {
    if (!alarmSound) alarmSound = new Audio("alarm.mp3");
    if (countdownInterval) return;

    if (remainingTime === 0) {
      const h = parseInt(inputHours.value) || 0;
      const m = parseInt(inputMinutes.value) || 0;
      const s = parseInt(inputSeconds.value) || 0;
      totalTime = h * 3600 + m * 60 + s;
      remainingTime = totalTime;
      if (totalTime === 0) return;
    }

    endTime = Date.now() + remainingTime * 1000;

    countdownInterval = setInterval(() => {
      remainingTime--;
      updateDisplay();

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        remainingTime = 0;
        countdownDisplay.classList.remove("warning");
        progressCircle.classList.remove("warning");
        showMessage("Час вийшов! ⏰");

        if (alarmSound) {
          alarmSound.currentTime = 0;
          alarmSound.play();
        }
      }
    }, 1000);

    requestAnimationFrame(updateProgress);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    remainingTime = 0;
    totalTime = 0;
    progressCircle.style.strokeDashoffset = circumference;
    countdownDisplay.textContent = "00:00:00";
    countdownDisplay.classList.remove("warning");
    progressCircle.classList.remove("warning");
    [inputHours, inputMinutes, inputSeconds].forEach((slider) => {
      slider.value = 0;
      updateSlider(slider);
    });
    hoursLabel.textContent = "0";
    minutesLabel.textContent = "0";
    secondsLabel.textContent = "0";
  });

  function showMessage(msg) {
    const message = document.getElementById("countdownMessage");
    message.textContent = msg;
    message.classList.add("show");
    setTimeout(() => message.classList.remove("show"), 2500);
  }
});
