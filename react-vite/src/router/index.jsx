import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import MainPage from "../components/MainPage/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import FourOFour from '../components/FourOFour/FourOFour';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/babbl",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <FourOFour />,
      }
    ],
  },
]);
