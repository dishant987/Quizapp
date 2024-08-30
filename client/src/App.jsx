import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { useTheme } from './components/Themecontext';
import Questions from './components/Questions';
import QuizHome from './components/QuizHome';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

const App = () => {
  const { mode } = useTheme();
  const defaultTheme = createTheme({ palette: { mode } });


  // Layout component to conditionally show the Navbar
  const LayoutWithNavbar = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/quiz'];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    return (
      <>
        <Navbar />
        <Outlet />
        {!shouldHideFooter && <Footer />}
      </>
    )
  };

  // Routes configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutWithNavbar />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/profile", element: <UserProfile /> },
        {
          path: "/quizhome",
          element: <ProtectedRoute><QuizHome /></ProtectedRoute>,
        },
        { path: "/results", element: <ProtectedRoute><Result /></ProtectedRoute> },
      ],
    },

    {
      path: "/quiz",
      element: <ProtectedRoute> <Quiz /></ProtectedRoute>,
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
