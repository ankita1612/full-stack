import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Card from "react-bootstrap/Card";
import Header from "./layout/Header";
import PostAdd from "./component/post/PostAdd";
import PostList from "./component/post/PostList";
import ListWithPagination from "./component/post/ListWithPagination";

import EmployeeAdd from "./component/employee/EmployeeAdd";
import EmployeeList from "./component/employee/EmployeeList";
import PrivateRoute from "./layout/PrivateRoute";
import PublicRoute from "./layout/PublicRoute";
import Dashboard from "./component/Dashboard";
import Aboutus from "./component/Aboutus";
import ProductList from "./component/product/ProductList";

const App = () => {
  return (
    <Card>
      <Header></Header>
      <Card.Body>
        <Routes>
          <Route path="/" element={<Navigate to="/registration" />} />
          <Route element={<PublicRoute />}>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post/add/:id?" element={<PostAdd />} />
            <Route path="/post/list" element={<PostList />} />
            <Route
              path="/post/listWithPagination"
              element={<ListWithPagination />}
            />
            <Route path="/employee/add/:id?" element={<EmployeeAdd />} />
            <Route path="/employee/list" element={<EmployeeList />} />
          </Route>

          <Route
            path="/aboutus"
            element={
              <PublicRoute>
                <Aboutus />
              </PublicRoute>
            }
          />
          <Route
            path="/product/list"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
        </Routes>
      </Card.Body>
    </Card>
  );
};

export default App;
