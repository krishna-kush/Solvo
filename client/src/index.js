import {
  React, 
  StrictMode
} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './state/state.js';

import { GoogleOAuthProvider } from '@react-oauth/google';


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <Provider store={store}>
      <GoogleOAuthProvider clientId='298447624013-hoh0qifah56cvqh6r10v811i0svmtlp7.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
