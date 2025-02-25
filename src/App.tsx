import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PostMainPage from "./features/post/PostMainPage";

import "./App.css";
import SinglePostPage from "./features/post/SinglePostPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostMainPage />}></Route>
          <Route path="/single" element={<SinglePostPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
