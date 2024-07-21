import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

const Btn = document.querySelector('button');
const secondsEl = document.querySelector('span.value[data-seconds]');
const minutesEl = document.querySelector('span.value[data-minutes]');
const hoursEl = document.querySelector('span.value[data-hours]');
const daysEl = document.querySelector('span.value[data-days]');

let userSelectedDate;

Btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      Btn.disabled = true;
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
    } else {
      Btn.disabled = false;
    }
  },
};

const dateTimeInput = document.querySelector('#datetime-picker');

flatpickr(dateTimeInput, options);

function addLeadingZero({ days, hours, minutes, seconds }) {
  secondsEl.textContent = String(seconds).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  daysEl.textContent = String(days).padStart(2, '0');
}

function handleBtnClick(event) {
  dateTimeInput.disabled = true;
  Btn.disabled = true;

  const intervalId = setInterval(() => {
    let diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      dateTimeInput.disabled = false;
      clearInterval(intervalId);
      addLeadingZero({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeLeft = convertMs(diff);

    addLeadingZero(timeLeft);
  }, 1000);
}

Btn.addEventListener('click', handleBtnClick);
