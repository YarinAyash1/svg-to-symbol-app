import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useContext} from "react";
import {ResultsContext} from "../context";
import {getItemDate} from "../helper";
import CodeSnippet from "./CodeSnippet";
import IconClose from "./icons/IconClose";
import {SvgConvertorContext} from "../context/SvgConvertorContext";
import {SymbolConvertorContext} from "../context/SymbolConvertorContext";

function SymbolsResults(): JSX.Element | null {
    const {results, deleteItemFromStorage} = useContext(SymbolConvertorContext);

    if (!results.length)
        return null;

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
                                    <Card.Title>Symbol (your input)</Card.Title>
                                    <div className="d-none" dangerouslySetInnerHTML={{__html: item.symbol}}></div>
                                    <div className="icon" dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                </Col>
                                <Col className={'text-center'}>
                                    <Card.Title>SVG (converted to)</Card.Title>
                                    <div className="icon" dangerouslySetInnerHTML={{__html: item.svg}}></div>

                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <CodeSnippet icon={item.svg} />
                        </Card.Footer>
                    </Card>
                ))
            }
        </div>
    )
}

export default SymbolsResults
