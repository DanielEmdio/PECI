import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "../Pages/Home/Home";
import Base from "../Layouts/Base";
import Subscription from "../Pages/Subscription/Subscription";
import Progress from "../Pages/Progress/Progress";
import NewPtTable from "../Pages/Subscription/NewPtTable";
import SubscriptionDetails from '../Pages/Subscription/SubscriptionDetails';
import LoginForm from '../Pages/Login/LoginForm';
import RegisterForm from '../Pages/Register/RegisterForm';
import Sign from '../Layouts/Sign';
import VideoPlayer from '../Pages/VideoPlayer/VideoPlayer';
import Settings from '../Pages/Settings/Settings';

export default function Router() {
    const router = createBrowserRouter([
      {
          path: '/', element: <Base/>, children: [
              
              { path: '/', element: <Home/> },
              { path: '/subscriptions', element: <Subscription/>,},
              { path: '/pt', element: <NewPtTable/>},
              { path: '/progress', element: <Progress/> },
              { path: '/temp', element: <SubscriptionDetails/>},
              { path: '/video', element: <VideoPlayer /> },
              { path: '/settings', element: <Settings /> }
          ]
      },
      { path: '/',element: <Sign/>, children: [

        { path: '/login', element: <LoginForm/> },
        {path: '/register', element: <RegisterForm/> },
      ]  
      },
  ])
  return <RouterProvider router={router} />
  
}
