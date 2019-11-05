import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

function RegisterServiceWorker({ children }) {
  useEffect(() => {
    async function registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('./sw.js', {
            scope: '/'
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    window.addEventListener('load', registerServiceWorker);

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return children;
}

ReactDOM.render(
  <RegisterServiceWorker>
    <App />
  </RegisterServiceWorker>,
  document.getElementById('app')
);
