import { TonConnectUIProvider } from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// TODO: replace with your the real app url
const APP_URL = 'https://awosome-ton-telegram-bot.vercel.app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider
    // after connected to the wallet, redirect to tg app
    actionsConfiguration={{
      twaReturnUrl: 'https://t.me/PacSampleBot',
      modals: 'all' // This will remove the preset loading modal in Tonkeeper
    }}
    manifestUrl={`${APP_URL}/tonconnect-manifest.json`}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TonConnectUIProvider>
);
