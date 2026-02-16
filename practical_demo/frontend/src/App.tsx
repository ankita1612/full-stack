import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import AdminAdd from "./component/admin/AdminAdd";
import AdminList from "./component/admin/AdminList";
import Card from "react-bootstrap/Card";
import Registration from "./component/Registration";
import Login from "./component/Login";
const App = () => {
  return (
    <>
      <Card>
        <Header></Header>
        <Card.Body>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="/login" index element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/admin/add/:id?" element={<AdminAdd />} />
            <Route path="/admin/list" element={<AdminList />} />
          </Routes>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
