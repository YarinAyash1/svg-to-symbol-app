import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import ExportAll from "../components/ExportAll";
import React from "react";
import FormSymbolConvertor from "../components/FormSymbolConvertor";
import {SymbolConvertorProvider} from "../context/SymbolConvertorContext";
import SymbolsResults from "../components/SymbolsResults";

function SymbolConvertor() {

    return (
        <>
            <SymbolConvertorProvider>
                <Container className={'mt-3 mb-3'}>
                    <Row>
                        <Col xs lg="4">
                            <Sidebar title={'Symbol to SVG Converter'} description={<>
                                <p>
                                    This tools will help you to convert <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol"
                                    rel="noopener">
                                    &lt;symbol&gt;
                                </a> to <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg"
                                    rel="noopener">
                                    &lt;svg&gt;
                                </a>
                                </p>
                            </>}
                                     allowUploader={false}
                                     formConvertor={<FormSymbolConvertor/>}
                            />
                        </Col>
                        <Col lg="8">
                            <SymbolsResults/>
                        </Col>
                    </Row>
                </Container>
            </SymbolConvertorProvider>
        </>
    )
}

export default SymbolConvertor;
