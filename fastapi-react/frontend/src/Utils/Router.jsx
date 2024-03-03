import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RatingPtInfo from '../Components/PersonalTrainer/RatingPtInfo';
import OtherPtInfo from '../Components/PersonalTrainer/OtherPtInfo';
import Subscription from "../Pages/Subscription/Subscription";
import Progress from "../Pages/Progress/Progress";
import NewPtTable from "../Pages/Subscription/NewPtTable";
import VideoPlayer from '../Pages/VideoPlayer/VideoPlayer';
import LoginForm from '../Pages/Login/LoginForm';
import RegisterForm from '../Pages/Register/RegisterForm';
import PtPage from '../Pages/PersonalTrainer/PtPage';
import MainPtInfo from '../Components/PersonalTrainer/MainPtInfo';
import BGPtInfo from '../Components/PersonalTrainer/BGPtInfo';
import Settings from '../Pages/Settings/Settings';
import Home from "../Pages/Home/Home";
import Chat from '../Pages/Chat/Chat';
import Sign from '../Layouts/Sign';
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

                {
                    path: '/PT/:id/', element: <PtPage />, children: [
                        { path: 'main', element: <MainPtInfo /> },
                        { path: 'bg', element: <BGPtInfo /> },
                        { path: 'other', element: <OtherPtInfo /> },
                        { path: 'rating', element: <RatingPtInfo /> },
                    ]
                },

                { path: '/video', element: <VideoPlayer /> }
            ]
        },
        {
            path: '/', element: <Sign />, children: [

                { path: '/login', element: <LoginForm /> },
                { path: '/register', element: <RegisterForm /> },
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}
