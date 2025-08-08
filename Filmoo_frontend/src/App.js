import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInterface from "./admin/Movie/Movieinterface"
import DisplayAllMovie from "./admin/Movie/DisplayAllMovie";
import Home from "./userinterface/screens/Home";
import DownloadPage from "./userinterface/screens/DownloadPage";
import Series from "./userinterface/screens/SeriesPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MovieInterface />} path="/movieinterface" />
          <Route element={<DisplayAllMovie />} path="/displayallmovie" />
          <Route element={<Home />} path="/" />
          <Route element={<DownloadPage />} path="/download/:movieid" />
          <Route element={<Series />} path="/series/:movieid/:season" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;