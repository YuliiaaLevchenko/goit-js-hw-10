import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const delayInput = this.elements['delay'].value;
  const delay = parseInt(delayInput, 10);
  
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
    .then(() => {
      iziToast.success({ message: `Fulfilled promise in ${delay}ms` });
    
    })
    .catch(() => {
      iziToast.error({ message: `Rejected promise in ${delay}ms` });
     
    });
    this.reset();
});
