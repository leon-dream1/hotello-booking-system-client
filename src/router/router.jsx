import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import MyBooking from "../pages/MyBooking/MyBooking";
import Room from "../pages/Room/Room";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import UpdateDate from "../pages/MyBooking/UpdateDate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/allRoom",
        element: <Room />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/room/${params.id}`),
      },
      {
        path: "/myBooking",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateDate",
        element: <UpdateDate />,
      },
    ],
  },
]);
