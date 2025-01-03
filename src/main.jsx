
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './App.css'
import ErrorPage from "./Routes/404";
import HomePage from "./Routes/landing_page";
import MobHomePage from "./mobLandingPage";
import LoginPage from "./Routes/login";
import RegisterPage from "./Routes/register";
import DashboardPage from "./Routes/dashboard";
import Setting from "./Routes/setting";
import SharedDashboardView from "./Routes/sharedDashboardView";
import FormBuldingDashboard from "./Routes/formBuldingDashboard";
import FormUpdatingDashboard from "./Routes/formUpdatingDashboard";
import SharedForm from "./Routes/sharedForm";
import FormResponses from "./Routes/formResponses";



  const router = createBrowserRouter([
    {
      path: "/",
      element:   <HomePage />, 
      errorElement: <ErrorPage />, 
     },
    {
      path:"/Mobile",
      element:<MobHomePage/>
    },
    {
      path:"Home",
      element:<HomePage/>
    },{
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/register",
      element:<RegisterPage/>
    },
    {
      path:"/dashboard",
      element:<DashboardPage/>
    },
    {
      path:"/editUser",
      element:<Setting/>
    },
    {
      path:"/sharedDashboard/invite/:token",
      element:<SharedDashboardView/>
    },
    {
      path:"dashboard/formBuilder",
      element:<FormBuldingDashboard/>
    },
    {
      path:"dashboard/formUpdating",
      element:<FormUpdatingDashboard/>
    },
    {
      path:"/Form/share/:token",
      element:<SharedForm/>
    },
    {
      path:"/form/responses-dashboard",
      element:<FormResponses/>
    }
    ]);
  


  ReactDOM.createRoot(document.getElementById("root")).render(
  
    
    <RouterProvider router={router} />

 
  );
  

 


