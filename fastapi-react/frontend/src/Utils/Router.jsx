import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "../Pages/Home/Home";
import Base from "../Layouts/Base";
import Subscription from "../Pages/Subscription/Subscription";
import Progress from "../Pages/Progress/Progress";

export default function Router() {

  const router = createBrowserRouter([
      {
          path: '/', element: <Base/>, children: [
              { path: '/', element: <Home/> },
              { path: '/subscriptions', element: <Subscription/> },
              { path: '/progress', element: <Progress/> }
          ]
      }
  ])
  return <RouterProvider router={router} />
  
}
  


/*
function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />  
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </> 
  );
}

export default App;
*/
