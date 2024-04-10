import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <HomePage />
        {/* <TabsBar /> */}
      </Router>
    </div>
  );
}

export default App;
