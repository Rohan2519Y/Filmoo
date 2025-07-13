import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInterface from "./admin/Movie/Movieinterface"
import DisplayAllMovie from "./admin/Movie/DisplayAllMovie";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MovieInterface />} path="/movieinterface" />
          <Route element={<DisplayAllMovie />} path="/displayallmovie" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;