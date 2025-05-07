import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInterface from "./admin/Movie/Movieinterface"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MovieInterface/>} path="/movieinterface"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
