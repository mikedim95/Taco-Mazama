import Route from "./components/Route";
import LoginPage from "./pages/LoginPage";
// import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>
      <Route path="/">
        {/* <LandingPage /> */}
        <LoginPage />
      </Route>
    </div>
  );
}

export default App;
