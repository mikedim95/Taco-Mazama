import Route from "./components/Route";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>
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
