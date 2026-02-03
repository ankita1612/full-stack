import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Card from "react-bootstrap/Card";
import Header from "./layout/Header";
import PostAdd from "./component/post/PostAdd";
import PostList from "./component/post/PostList";

const App = () => {
  return (
    <Card>
      <Header></Header>
      <Card.Body>
        <Routes>
          <Route path="/" element={<Navigate to="/registration" />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/add/:id?" element={<PostAdd />} />
          <Route path="/post/list" element={<PostList />} />
        </Routes>
      </Card.Body>
    </Card>
  );
};

export default App;
