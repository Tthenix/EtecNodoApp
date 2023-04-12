import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import PcProvider from './components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PcProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </PcProvider>
);

