import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/home";
import Survey from "./pages/survey";
import { SurveyProvider } from "./context/survey";

function App() {
  axios.defaults.baseURL = "https://localhost:5001";
  return (
    <SurveyProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </SurveyProvider>
  );
}

export default App;
