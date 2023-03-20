import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { getStore } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './pages/home/Home';

import './index.css';
import { SignUp } from './pages/signUp/SignUp';
import { ProductView } from './pages/shop/ProductView';
import { SignIn } from './pages/signIn/SignIn';
import { ShoppingCart } from './pages/shoppingCart/shoppingCart';
import { AboutUs } from './pages/aboutUs/AboutUs';
import { TypesOfServices } from './pages/ToS/TypesOfServices';
import { ContactUs } from './pages/contactUs/ContactUs';
import { DBMaintain } from './pages/dbMaintain/DBMaintain';

const container = document.getElementById('root');
const root = createRoot(container);

const { store, persistor } = getStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/product/:productId",
    element: <ProductView />
  },
  {
    path: "/signIn",
    element: <SignIn />
  },
  {
    path: '/shoppingCart',
    element: <ShoppingCart />
  },
  {
    path: '/aboutUs',
    element: <AboutUs />
  },
  {
    path: '/ToS',
    element: <TypesOfServices />
  },
  {
    path: '/contactUs',
    element: <ContactUs />
  },
  {
    path: '/DBM',
    element: <DBMaintain />
  }
]);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
