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

  let countdownInterval;

  function updateTimerDisplay(timeLeft) {
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    const formattedTime = `$
    {addLeadingZero(days)}:$
    {addLeadingZero(hours)}:$
    {addLeadingZero(minutes)}:$
    {addLeadingZero(seconds)}`;
    
    const startButton = document.querySelector('[data-start]');
    if (startButton) {
        startButton.innerText = formattedTime;}
    }
    
  function startCountdown(targetDate) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(function() {
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;
    
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          updateTimerDisplay(0);
          iziToast.success({ message: 'Countdown finished!' });
          const startButton = document.querySelector('[data-start]');
          if (startButton) {
            startButton.disabled = true;
          }
        } else {
          updateTimerDisplay(timeLeft);
        }
      }, 1000);
    }

    let flatpickrInstance;

    flatpickr('#datetime-picker', {
      minDate: 'today',
      onChange: function(selectedDates, dateStr, instance) {
        flatpickrInstance = instance;
        const selectedDate = selectedDates.length > 0 ? selectedDates[0] : null;
        const currentDate = new Date();
        const startButton = document.querySelector('[data-start]');
      
        if (startButton && selectedDate > currentDate) {
          startButton.disabled = false;
        } else if (startButton) {
          startButton.disabled = true;
          iziToast.error({ message: 'Please choose a date in the future' });
        }
      }
    });
    
    document.querySelector('[data-start]').addEventListener('click', function() {
      const selectedDate = flatpickrInstance?.selectedDates?.[0];
      if (selectedDate) {
        startCountdown(selectedDate.getTime());
        this.disabled = true;
      
      }
    });