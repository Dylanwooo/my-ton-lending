import './App.css';
import '@twa-dev/sdk';
import 'react-toastify/dist/ReactToastify.css';
import { ColorMode, ThemeProvider, defaultThemeConfig } from '@parallel-mono/components';
import { useRoutes, RouteObject } from 'react-router-dom';

import { useAppRoutes } from './routes';

import { Web3ContextProvider, ToastProvider } from '@/conntexts';

const MemoRoutes = ({ routes }: { routes: RouteObject[] }) => {
  const routeElements = useRoutes(routes);
  return routeElements;
};

const App = () => {
  const routes = useAppRoutes();

  return (
    <ThemeProvider mode={ColorMode.dark} themeConfig={defaultThemeConfig}>
      <Web3ContextProvider>
        <ToastProvider>
          <MemoRoutes routes={routes} />
        </ToastProvider>
      </Web3ContextProvider>
    </ThemeProvider>
  );
};

export default App;
