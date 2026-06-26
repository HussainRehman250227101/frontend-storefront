
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import {Provider as ReduxProvider}from 'react-redux'
import {store} from './app/store.ts'
import App from "./App.tsx";
import "./index.css";



createRoot(document.getElementById("root")!).render(
 
    <Provider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Provider>

);
