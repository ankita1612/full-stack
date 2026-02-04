import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Card from "react-bootstrap/Card";
import Header from "./layout/Header";
import PostAdd from "./component/post/PostAdd";
import PostList from "./component/post/PostList";
import EmployeeAdd from "./component/employee/EmployeeAdd";
import EmployeeList from "./component/employee/EmployeeList";
import PrivateRoute from "./layout/PrivateRoute";
const App = () => {
  return (
    <Card>
      <Header></Header>
      <Card.Body>
        <Routes>
          <Route path="/" element={<Navigate to="/registration" />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/post/add/:id?" element={<PostAdd />} />
            <Route path="/post/list" element={<PostList />} />
            <Route path="/employee/add/:id?" element={<EmployeeAdd />} />
            <Route path="/employee/list" element={<EmployeeList />} />
          </Route>
        </Routes>
      </Card.Body>
    </Card>
  );
};

export default App;
