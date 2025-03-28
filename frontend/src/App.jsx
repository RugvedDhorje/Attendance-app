import StudentForm from "./Components/CreateStudent";
import DeleteStudent from "./Components/DeleteStudent";
import DownloadAttendance from "./Components/DownloadAttendance";
import Home from "./Components/Home";
import MarkAttendance from "./Components/MarkAttendance";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchStudent from "./Components/SearchStudent";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/createStudent",
      element: <StudentForm />, // The Products list page
    },
    {
      path: "/MarkAttendance", // The individual product detail page
      element: <MarkAttendance />,
    },
    {
      path: "/delete", // Use this for services
      element: <DeleteStudent />,
    },
    {
      path: "/downloadAttendance", // Use this for services
      element: <DownloadAttendance />,
    },
    {
      path: "/search",
      element: <SearchStudent />,
    },
    // {
    //   path:"/infrastructure",
    //   element: <Infrastructure/>
    // }
  ]);
  return (
    <div className="w-full h-auto">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
{
  /* <Home />
      <MarkAttendance />
      <StudentForm />
      <DeleteStudent />
      <DownloadAttendance /> */
}
