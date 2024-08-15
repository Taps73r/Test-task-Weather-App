import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </Provider>
    </StrictMode>
);
