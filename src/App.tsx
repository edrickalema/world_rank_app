import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SingleCountry from "./pages/SingleCountry";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "countries/:country_name",
      element: <SingleCountry />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
