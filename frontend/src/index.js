import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { getStore } from './store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './pages/home/Home';

import './index.css';
import { SignUp } from './pages/signUp/SignUp';

const container = document.getElementById('root');
const root = createRoot(container);

const { store } = getStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signUp",
    element: <SignUp />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
