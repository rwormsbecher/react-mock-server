import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { NavbarComponent } from './components/Navbar';

function App() {
    return (
        <div className="App">
            <NavbarComponent />

            <Container>
                <Row className="mt-5">
                    <Col md="12">hello world!</Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
