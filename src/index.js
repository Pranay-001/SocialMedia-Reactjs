import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
