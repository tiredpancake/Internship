import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@fontsource/vazirmatn/100.css';
import '@fontsource/vazirmatn/300.css';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/900.css';

const rootElement=document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);

