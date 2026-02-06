import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center text-center">
      <Row>
        <Col>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-3">Oops! Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed or does not
            exist.
          </p>

          <Button as={Link} to="/" variant="primary" size="lg">
            ⬅ Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
