import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./admin/Category/Category";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Category/>} path="/categoryinterface"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
