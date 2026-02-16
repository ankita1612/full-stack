import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import AdminAdd from "./component/admin/AdminAdd";
import AdminList from "./component/admin/AdminList";
import Card from "react-bootstrap/Card";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Home from "./component/Home";
import PrivateRoute from "./layout/PrivateRoute";
import PublicRoute from "./layout/PublicRoute";
const App = () => {
  return (
    <>
      <Card>
        <Header></Header>
        <Card.Body>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/admin/add/:id?" element={<AdminAdd />} />
              <Route path="/admin/list" element={<AdminList />} />
            </Route>
          </Routes>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
