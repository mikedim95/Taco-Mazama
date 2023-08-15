//pages
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Step1 from "./pages/Step1";

//routes
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Step1" element={<Step1 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
