import {useContext} from "react";
import {ResultsContext, ResultsProvider} from "./context.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Results from "./components/Results.jsx";
import {Col, Container, Row} from "react-bootstrap";

function App() {
    return (
        <ResultsProvider>
            <Container className={'mt-3 mb-3'}>
                <Row>
                    <Col xs lg="4">
                        <Sidebar/>
                    </Col>
                    <Col lg="8">
                        <Results/>
                    </Col>
                </Row>
            </Container>
        </ResultsProvider>
    )
}

export default App
