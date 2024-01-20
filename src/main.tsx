import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { DatabaseProvider } from "./components/DatabaseProvider";
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </Provider>
)
