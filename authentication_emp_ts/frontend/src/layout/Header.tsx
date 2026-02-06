import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Card from "react-bootstrap/Card";
import logo from "../assets/images/1.png";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/apiClient";

function Header() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch (err) {
      console.error("Server logout failed", err);
    }
    logout();
    navigate("/login", {
      replace: true,
      state: { msg: "Logout successfully", type: "success" },
    });
  };

  return (
    <Card.Header className="p-0">
      <Navbar expand="lg" bg="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="Logo" height="30" className="me-2" />
            Demo
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              {!user ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/registration">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/aboutus">
                    Aboutus
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title="Post">
                    <NavDropdown.Item as={NavLink} to="/post/list">
                      List
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/post/listWithPagination"
                    >
                      List With Pagination
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/post/add">
                      Add
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Employee">
                    <NavDropdown.Item as={NavLink} to="/employee/list">
                      List
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/employee/add">
                      Add
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Product">
                    <NavDropdown.Item as={NavLink} to="/product/list">
                      List
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
            </Nav>

            <Navbar.Text>
              {user ? `Welcome ${user.username}` : "Guest User"}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Card.Header>
  );
}

export default Header;
