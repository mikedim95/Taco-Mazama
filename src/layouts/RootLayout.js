import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <div>
        <Link to="/"></Link>
        <Link to="LandingPage"></Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
