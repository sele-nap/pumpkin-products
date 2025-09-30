import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Navbar />
      </Layout>
    ),
    children: []
  },
  { path: '/login', element: <Layout><Login /></Layout> },
  { path: '/signup', element: <Layout><Signup /></Layout> },
  {
    path: '/',
    element: <Layout><Navbar /><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>
  },
]);