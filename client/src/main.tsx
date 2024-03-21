import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
// import BackgroundBig from "./components/BackgroundBig/BackgroundBig.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <BackgroundBig /> */}
      <App />
    </Provider>
  </BrowserRouter>
)

