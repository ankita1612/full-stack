import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/registration";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" />} />
      <Route path="/registration" element={<Register />} />
    </Routes>
  );
};

export default App;
