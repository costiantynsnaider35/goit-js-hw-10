import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('input[name=delay]');

const form = document.querySelector('.form');

function handleSub(event) {
  event.preventDefault();

  const stateIn = document.querySelector('input[name="state"]:checked').value;
  const delayIn = Number(delayInput.value);

  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateIn === 'fulfilled') {
        resolve(delayIn);
      } else if (stateIn === 'rejected') {
        reject(delayIn);
      }
    }, delayIn);
  })
    .then(value =>
      iziToast.success({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'green',
        message: `✅ Fulfilled promise in ${value}ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: `❌ Rejected promise in ${value}ms`,
      })
    );
}

form.addEventListener('submit', handleSub);
