import React, {Component} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
class TopNav extends Component {
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Atomic Swap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/ethertoerc20">Ether To ERC20</Nav.Link>
                            <Nav.Link href="/erc20toerc20">ERC20 To ERC20</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Client</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default TopNav;