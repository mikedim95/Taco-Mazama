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
import BeverageSteps from "./pages/BeverageSteps";
import SidesPage from "./pages/SidesPage";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import Table from "./components/Table";

// inside the jsx being returned:

serviceWorkerRegistration.register();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Steps" element={<Steps />} />
      <Route path="BucketPage" element={<BucketPage />} />
      <Route path="SidesPage" element={<SidesPage />} />
      <Route path="BeveragesPage" element={<BeverageSteps />} />
      {/* <Route path="Table/:tableNo" element={<Table />} /> */}
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
