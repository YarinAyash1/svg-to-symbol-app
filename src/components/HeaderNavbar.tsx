import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import IsraelFlag from "./icons/IsraelFlag";

function HeaderNavbar(): JSX.Element | null {
    return (
        <Navbar className={'bg-primary'}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/apple-touch-icon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    <IsraelFlag style={{
                        width: '55px',
                        height: '42px',
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Link className={'nav-link'} to="/">SVG to Symbol</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className={'nav-link'} to="/symbol-to-svg">Symbol to SVG</Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default HeaderNavbar;
