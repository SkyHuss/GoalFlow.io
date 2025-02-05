import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import SessionList from './pages/sessionList/SessionList';
import Analytics from './pages/analytics/Analytics';
import History from './pages/history/History';
import FocusMode from './pages/focusMode/FocusMode';
import PersonalInfo from './pages/profile/personalInfo/PersonalInfo';
import MobileSidebar from './components/sidebar/mobileSidebar/MobileSidebar';
import BottomNavBar from './components/navbar/bottomNavBar/BottomNavBar';
import './constants/style/color.css';
import './constants/style/font.css';
import './App.css';
import DesignWorkshop from './pages/designWorkshop/DesignWorkshop';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signUp/SignUp';

function AppLayout() {
  return (
    <div id='app-container' className='app-container'>
      <Navbar />
      <div className="sidebar-and-content-container">
        <Sidebar />
        <MobileSidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <BottomNavBar />
      </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [ // Children are render in the Outlet
      {
        path: '/',
        element: <Home />
      },
      //Sidebar links
      {
        path: '/session-list',
        element: <SessionList />
      },
      {
        path: '/focus',
        element: <FocusMode />
      },
      {
        path: '/analytics',
        element: <Analytics />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/design',
        element: <DesignWorkshop />
      },
      //Profile links
      {
        path: '/personal-info',
        element: <PersonalInfo />
      }
      // TODO: rajouter les autres pages de l'app ( session pages, account, settings, ...)
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
])

export default function App() {

  return (
    <RouterProvider router={router} />
  )
}