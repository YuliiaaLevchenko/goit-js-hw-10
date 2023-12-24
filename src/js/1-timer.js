import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
      console.log(selectedDates[0]);
    },
  };

  function addLeadingZero(value) {
    return toString(value).padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datetimePicker = document.getElementById("datetime-picker");
let userSelectedDate; 

flatpickr(datetimePicker, {
  ...options,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 
    const currentDate = new Date();
    console.log(userSelectedDate);

    if (userSelectedDate < currentDate) {
      window.alert("Please choose a date in the future");
    } else {
    }
  },
});

const startButton = document.querySelector('[data-start]');
let timerInterval;
let timeDifference; 

startButton.addEventListener("click", () => {
    console.log("Current date:", new Date());
    console.log("Time Difference:", timeDifference);
  timeDifference = userSelectedDate - new Date();

  if (timeDifference <= 0) {
    window.alert("Please choose a future date before starting the timer.");
    return;
  }

const timerDisplay = document.getElementById("value");
const timerContainer = document.querySelector('.timer');

  timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
    } else {
      timeDifference -= 1000;
    }
  }, 1000);
});