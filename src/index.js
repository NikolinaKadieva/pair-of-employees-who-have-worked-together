import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataTable from './components/DataTable.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="pairs-of-employees" element={<DataTable />} />
            </ Route>
        </Routes>
    </BrowserRouter>
);