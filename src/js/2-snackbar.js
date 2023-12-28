import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  this.reset();

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
    .then((result) => {
      iziToast.success({ message: `Fulfilled promise in ${result}ms` });
    
    })
    .catch((result) => {
      iziToast.error({ message: `Rejected promise in ${result}ms` });
     
    });
});
