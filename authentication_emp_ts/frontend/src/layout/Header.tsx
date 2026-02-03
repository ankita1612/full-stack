import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Card from "react-bootstrap/Card";
function Header() {
  return (
    <Card.Header>
      <img src="images/1.png" alt="Logo" />
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registration">Register</Nav.Link>
              <NavDropdown title="post" id="basic-nav-dropdown">
                <NavDropdown.Item href="/post/list">List</NavDropdown.Item>
                <NavDropdown.Item href="/post/add">Add</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <NavDropdown title="Employee" id="basic-nav-dropdown">
                <NavDropdown.Item href="/employee/list">List</NavDropdown.Item>
                <NavDropdown.Item href="/employee/add">Add</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Card.Header>
  );
}

export default Header;
