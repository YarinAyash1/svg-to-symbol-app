import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import SvgsResults from "../components/SvgsResults";
import ExportAll from "../components/ExportAll";
import {ResultsProvider} from "../context";
import React from "react";
import FormSvgConvertor from "../components/FormSvgConvertor";
import {SvgConvertorProvider} from "../context/SvgConvertorContext";

function SvgConvertor() {

    return (
        <>
            <SvgConvertorProvider>
                <Container className={'mt-3 mb-3'}>
                    <Row>
                        <Col xs lg="4">
                            <Sidebar title={'SVG to Symbol Converter'} description={<>
                                <p>
                                    This tools will help you to bring <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol"
                                    rel="noopener">
                                    &lt;symbol&gt;
                                </a> to your web pages.
                                </p>
                                <p>
                                    If you are wondering why is better to use symbols instead of SVGs then read <a
                                    href="https://css-tricks.com/svg-symbol-good-choice-icons/"
                                    rel="noopener">this article from CSS-Tricks</a>.
                                </p>

                            </>}
                                     allowUploader={true}
                                     formConvertor={<FormSvgConvertor/>}
                            />
                        </Col>
                        <Col lg="8">
                            <SvgsResults/>
                        </Col>
                    </Row>
                </Container>
                <ExportAll/>
            </SvgConvertorProvider>

        </>
    )
}

export default SvgConvertor;
