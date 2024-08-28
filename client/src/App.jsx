import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { useTheme } from './components/Themecontext';
import Questions from './components/Questions';
import Home from './components/Home';
import Quiz from './components/Quiz';

const App = () => {
  const { mode } = useTheme();
  const defaultTheme = createTheme({ palette: { mode } });

  // Layout component to conditionally show the Navbar
  const LayoutWithNavbar = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

  // Routes configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutWithNavbar />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "profile", element: <UserProfile /> },
      ],
    },
    {
      path: "/quizhome",
      element: <Home />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
  ]);

  return (
    <MUIThemeProvider theme={defaultTheme}>
      <CookiesProvider>
        <CssBaseline />
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "20px",
            }
          }}
        />
      </CookiesProvider>
    </MUIThemeProvider>
  );
};

export default App;
