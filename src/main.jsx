import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App.jsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './RTK/store.js';

createRoot(document.getElementById('root')).render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </CookiesProvider>
);
