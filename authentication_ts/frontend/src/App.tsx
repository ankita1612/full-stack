import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import Login from "./component/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
