import './main.css';

window.onload = () => {
  console.log('hello world!');
  console.log('goodbye world');
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) =>
        console.log('service worker registered: ', registration)
      )
      .catch((err) => console.log('error registering service worker: ', err));
  });
}
