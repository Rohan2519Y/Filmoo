import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInterface from "./admin/Movie/Movieinterface"
import DisplayAllMovie from "./admin/Movie/DisplayAllMovie";
import Home from "./userinterface/screens/Home";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MovieInterface />} path="/movieinterface" />
          <Route element={<DisplayAllMovie />} path="/displayallmovie" />
          <Route element={<Home />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;