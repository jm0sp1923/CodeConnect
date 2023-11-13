
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './profiles.css'


function ProfilePage() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <img src="https://via.placeholder.com/150"
            alt="Profile"
            className="img-fluid rounded-circle"
          />
        </Col>
        <Col md={8}>
          <h1>Nombre del usuario</h1>
          <p>Datos de usuario</p>
          <p>Descripción breve</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;