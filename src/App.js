import Route from "./components/Route";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Route path="/">
        <LoginPage />
      </Route>
      <Route path="/LandingPage">
        <LandingPage />
      </Route>
    </div>
  );
}

export default App;
