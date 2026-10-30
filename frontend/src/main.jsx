import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 1. استيراد Provider
import { store } from './store/store'; // 2. استيراد الـ Store الخاص بك
import "@/styles/global.css";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* 3. تغليف التطبيق هنا */}
      <App />
    </Provider>
  </React.StrictMode>
);

