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
import BasketPage from "./pages/BacketPage";
import DrinkPage from "./pages/DrinkPage";
import SidesPage from "./pages/SidesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Steps" element={<Steps />} />
      <Route path="BasketPage" element={<BasketPage />} />
      <Route path="SidesPage" element={<SidesPage />} />
      <Route path="DrinkPage" element={<DrinkPage />} />
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
