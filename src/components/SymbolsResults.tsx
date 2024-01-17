import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useContext} from "react";
import {ResultsContext} from "../context";
import {getItemDate} from "../helper";
import CodeSnippet from "./CodeSnippet";
import IconClose from "./icons/IconClose";
import {SvgConvertorContext} from "../context/SvgConvertorContext";
import {SymbolConvertorContext} from "../context/SymbolConvertorContext";
import IconDownload from "./icons/IconDownload";

function SymbolsResults(): JSX.Element | null {
    const {results, deleteItemFromStorage, downloadFile} = useContext(SymbolConvertorContext);

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
                                    <OverlayTrigger
                                        key={'left'}
                                        placement={'left'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'left'}`}>
                                                Download File
                                            </Tooltip>
                                        }
                                    >
                                        <Button size={'sm'} variant="link" onClick={() => downloadFile(i)}>
                                            <IconDownload width={'25px'} height={'25px'} />
                                        </Button>
                                    </OverlayTrigger>
                                    <Button size={'sm'} variant="danger"
                                            onClick={() => deleteItemFromStorage(i)}>Delete <IconClose/></Button>
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
                            <CodeSnippet icon={item.svg}/>
                        </Card.Footer>
                    </Card>
                ))
            }
        </div>
    )
}

export default SymbolsResults
