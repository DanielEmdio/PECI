import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RatingPtInfo from '../Components/PersonalTrainer/RatingPtInfo';
import OtherPtInfo from '../Components/PersonalTrainer/OtherPtInfo';
import Subscription from "../Pages/Subscription/Subscription";
import Progress from "../Pages/Progress/Progress";
import NewPtTable from "../Pages/Subscription/NewPtTable";
import VideoPlayer from '../Pages/VideoPlayer/VideoPlayer';
import LoginForm from '../Pages/Login/LoginForm';
import RegisterForm from '../Pages/Register/RegisterForm';
import Sign from '../Layouts/Sign';
import PtSubPage from '../Pages/PersonalTrainer/PtSubPage';
import MainPtInfo from '../Components/PersonalTrainer/MainPtInfo';
import PtMainPage from '../Pages/PersonalTrainer/PtMainPage';
import BGPtInfo from '../Components/PersonalTrainer/BGPtInfo';
import Settings from '../Pages/Settings/Settings';
import RegisterBasic from '../Components/Register/RegisterBasic';
import RegisterPt from '../Components/Register/RegisterPt';
import Home from "../Pages/Home/Home";
import Chat from '../Pages/Chat/Chat';
import Base from "../Layouts/Base";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/', element: <Base />, children: [
                { path: '/', element: <Home /> },
                { path: '/subscriptions', element: <Subscription />, },
                { path: '/AvaliblePT', element: <NewPtTable /> },
                { path: '/progress', element: <Progress /> },
                { path: '/settings', element: <Settings /> },
                { path: '/chat/:id', element: <Chat /> },
                { path: '/temp', element: <PtMainPage /> },

                {
                    path: '/PT/:id/', element: <PtSubPage />, children: [
                        { path: 'main', element: <MainPtInfo /> },
                        { path: 'bg', element: <BGPtInfo /> },
                        { path: 'other', element: <OtherPtInfo /> },
                        { path: 'rating', element: <RatingPtInfo /> },
                    ]
                },

                { path: '/video/:VideoID', element: <VideoPlayer /> }
            ]
        },
        {
            path: '/', element: <Sign />, children: [
                { path: '/login', element: <LoginForm /> },
                {
                    path: '/register', element: <RegisterForm />, children: [
                        { path: '/register/athlete', element: <RegisterBasic /> },
                        { path: '/register/trainer', element: <RegisterPt /> },
                    ]
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}
