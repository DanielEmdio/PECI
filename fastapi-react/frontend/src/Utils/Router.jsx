import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../Pages/Home/Home";
import Base from "../Layouts/Base";
import Subscription from "../Pages/Subscription/Subscription";
import Progress from "../Pages/Progress/Progress";
import NewPtTable from "../Pages/Subscription/NewPtTable";
import LoginForm from '../Pages/Login/LoginForm';
import RegisterForm from '../Pages/Register/RegisterForm';
import Sign from '../Layouts/Sign';
import VideoPlayer from '../Pages/VideoPlayer/VideoPlayer';
import PtPage from '../Pages/PersonalTrainer/PtPage';
import MainPtInfo from '../Components/PersonalTrainer/MainPtInfo';
import BGPtInfo from '../Components/PersonalTrainer/BGPtInfo';
import OtherPtInfo from '../Components/PersonalTrainer/OtherPtInfo';
import RatingPtInfo from '../Components/PersonalTrainer/RatingPtInfo';
import Settings from '../Pages/Settings/Settings';

export default function Router() {
    const router = createBrowserRouter([
      {
          path: '/', element: <Base/>, children: [
              
              { path: '/', element: <Home/> },
              { path: '/subscriptions', element: <Subscription/>,},
              { path: '/AvaliblePT', element: <NewPtTable/>},
              { path: '/progress', element: <Progress/> },
              { path:'/settings', element: <Settings/>},

              { path: '/PT/:id/', element: <PtPage/>, children: [
                { path: 'main', element: <MainPtInfo/> },
                { path: 'bg', element: <BGPtInfo/> },
                { path: 'other', element: <OtherPtInfo/> },
                { path: 'rating', element: <RatingPtInfo/> },
              ]},

              { path: '/video', element: <VideoPlayer /> }
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
