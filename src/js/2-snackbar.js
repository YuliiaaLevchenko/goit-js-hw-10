import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements['delay'].value, 10);
  const state = this.elements['state'].value;

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  notificationPromise
    .then((delay) => {
      iziToast.success({ message: `Fulfilled promise in ${delay}ms` });
    })
    .catch((delay) => {
      iziToast.error({ message: `Rejected promise in ${delay}ms` });
    });
});