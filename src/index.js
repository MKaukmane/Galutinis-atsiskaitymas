import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext';
import { QuestionsProvider } from './contexts/QuestionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <BrowserRouter>
        <UsersProvider>
            <QuestionsProvider>
                <App />
            </QuestionsProvider>
        </UsersProvider>
    </BrowserRouter>
);
