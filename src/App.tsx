import {ResultsProvider} from "./context";
import Sidebar from "./components/Sidebar";
import Results from "./components/Results";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import axios from "axios";

function App() {

    useEffect(() => {
        axios.get(`${import.meta.env['VITE_API_URL']}/keep-alive`)
    }, [])

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
