import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Layout from "./layout";
import ErrorPage from "./error-page";
import Chat from "./pages/chat";
import Karaoke from "./pages/karaoke";

const routes = [
    {
        path: "/",
        element: <Chat />
    },
    {
        path: "/karaoke",
        element: <Karaoke />
    }
];

const router = createBrowserRouter(
    routes.map(({ path, element }) => ({
        path,
        element: <Layout>{element}</Layout>,
        errorElement: <ErrorPage />
    }))
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
