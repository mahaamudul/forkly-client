
import {
    createBrowserRouter,
    Navigate,
    
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashBoard from "../Layouts/DashBoard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from './AdminRoute'
import Additems from '../pages/Dashboard/Additems/Additems'
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Contact from "../pages/Contact/Contact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import { API_BASE_URL } from "../config/api";



// import Login from "../pages/Login/Login";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/menu',
            element: <Menu></Menu>
        },
        {
          path: '/contact',
          element: <Contact></Contact>
        },
        {
          path: '/order',
          element: <Navigate to="/order/salad" replace></Navigate>
        },
        {
          path: '/order/:category',
          element: <Order></Order>
        },
        {
          path: '/login',
          element:<Login></Login>
        },
        {
          path:'/signUp',
          element: <Register></Register>
        }
        
      ]
    },

    //dashboard routes
    {
      path: '/dashboard',
      element: <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>,
      children:[
        {
          index: true,
          element: <DashboardHome></DashboardHome>
        },
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path:'cart',
          element: <Cart></Cart>

        },
        {
          path:'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: 'reservation',
          element: <Reservation></Reservation>
        },
        {
          path: 'addReview',
          element: <AddReview></AddReview>
        },
        {
          path: 'myBookings',
          element: <MyBookings></MyBookings>
        },


        //admin  uses routes
        {
          path:'addItems',
          element: <AdminRoute>
            <Additems></Additems>
          </AdminRoute>
        },
        {
          path: 'manageItems',
          element: <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        },
        {
          path: 'manageBookings',
          element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`${API_BASE_URL}/menu/${params.id}`)
        },


        {
          path:'allUsers',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);
