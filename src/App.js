import React from "react";
import { MyProvider } from "./context/UseMyContext"; // Import your context provider
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Steps from "./pages/Steps";
import RootLayout from "./layouts/RootLayout";
import BucketPage from "./pages/BucketPage";
import BeveragesPage from "./pages/BeveragesPage";
import SidesPage from "./pages/SidesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Steps" element={<Steps />} />
      <Route path="BucketPage" element={<BucketPage />} />
      <Route path="SidesPage" element={<SidesPage />} />
      <Route path="BeveragesPage" element={<BeveragesPage />} />
    </Route>
  )
);

function App() {
  return (
    <MyProvider>
      <RouterProvider router={router} />
    </MyProvider>
  );
}

export default App;
