import {Col, ListGroup, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useContext} from "react";
import {ResultsContext} from "../context.jsx";
import {getItemDate} from "../helper.js";
import CodeSnippet from "./CodeSnippet.jsx";
import IconClose from "./icons/IconClose.jsx";

function Results() {
    const {results, deleteItemFromStorage} = useContext(ResultsContext);

    if (!results.length)
        return;

    return (
        <div className="results pt-3">
            {
                results.map((item, i) => (
                    <Card className={'mb-3'} key={i}>
                        <Card.Header>
                            <Row className={'align-items-center'}>
                                <Col className={'text-start'}>
                                    {getItemDate(item.time)}
                                </Col>
                                <Col className={'text-end'}>
                                    <Button size={'sm'} variant="danger" onClick={() => deleteItemFromStorage(i)}>Delete <IconClose /></Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className={'align-items-center'}>
                                <Col className={'text-center'}>
                                    <Card.Title>Svg (your input)</Card.Title>
                                    <div className="icon" dangerouslySetInnerHTML={{__html: item.svg}}></div>

                                </Col>
                                <Col className={'text-center'}>
                                    <Card.Title>Symbol (converted to)</Card.Title>
                                    <div className="d-none" dangerouslySetInnerHTML={{__html: item.symbol}}></div>
                                    <div className="icon" dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <CodeSnippet icon={item.icon} symbol={item.codeSample} />
                        </Card.Footer>
                    </Card>
                ))
            }
        </div>
    )
}

export default Results
