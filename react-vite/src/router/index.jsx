import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import MainPage from '../components/MainPage/MainPage'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      }
    ],
  },
  {
    path:"/babbl",
    element: <MainPage />
  }
]);
