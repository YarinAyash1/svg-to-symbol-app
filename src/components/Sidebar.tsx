import {Alert, Button, Form} from "react-bootstrap";
import IconSend from "./icons/SendIcon";
import React, {useContext, useEffect, useRef, useState} from "react";
import {buildHtml, getSampleSVG, getUuid} from "../helper";
import axios from "axios";
import {ResultsContext} from "../context";
import DragDropFile from "./DragDropFile";

function Sidebar() {
    const {results, setResults} = useContext(ResultsContext);
    const [textArea, setTextArea] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmittedStatus] = useState<boolean>(false);
    const [allowUpload, setAllowUpload] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [svgName, setSvgName] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const loadSampleSVG = () => {
        setSvgName("sample");
        setTextArea(getSampleSVG());
        setSubmittedStatus(true);
    };

    useEffect(() => {
        if (!submitted) return;

        handleSubmit();

        return setSubmittedStatus(false)
    }, [submitted])

    const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        if (!textArea) {
            setErrorMessage('Please add your svg');
            textAreaRef.current?.focus();
            return;
        }
        setIsLoading(true);
        axios.post(`${import.meta.env['VITE_API_URL']}/convert`, {
            svgData: textArea,
            name: svgName
        }, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        })
            .then(onSuccess)
            .catch(() => {
                setErrorMessage('Error!')
                setIsLoading(false);
            });
    };

    function onSuccess(response: { data: { input: any; svgId: string; symbol: string; }; }) {
        const uuid = getUuid();
        const svg = response.data.input;
        const svgId = response.data.svgId || uuid;
        const compiledSamples = buildHtml(response.data.symbol, svgId);

        setResults(prevState => [{
            svg,
            symbol: compiledSamples.symbol,
            icon: compiledSamples.icon,
            codeSample: compiledSamples.symbolExample,
            time: new Date()
        }, ...prevState]);

        clearInputs();
        setIsLoading(false);
    }

    useEffect(() => {
        if(!results.length) return;
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(results));
    }, [results])

    const clearInputs = () => {
        setErrorMessage('')
        setTextArea('')
        setSvgName('')
    }


    return (
        <div className={'position-sticky top-0 pt-3 pe-lg-5'}>
            <h1 className="title">SVG to Symbol Converter</h1>
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
            <hr className={'opacity-25'}/>
            <Form.Check
                type="switch"
                id="custom-switch"
                label={!allowUpload ? 'Switch to upload files' : 'Switch to inline svg'}
                onChange={e => setAllowUpload(e.target.checked)}
            />
            {
                allowUpload ? (<DragDropFile onSuccess={onSuccess} setIsLoading={setIsLoading} isLoading={isLoading}/>) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="SVGId">
                            <Form.Label>Symbol Name</Form.Label>
                            <Form.Control placeholder={'Symbol Name'}
                                          onChange={(e) => setSvgName(e.target.value)}
                                          value={svgName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SVGTextArea">
                            <Form.Label>Convert SVG</Form.Label>
                            <Form.Control placeholder={'<svg>\n' + '  <!-- here the svg to convert... -->\n' + '</svg>'}
                                          onChange={(e) => setTextArea(e.target.value)}
                                          value={textArea}
                                          ref={textAreaRef}
                                          as="textarea" rows={12}/>
                        </Form.Group>
                        {errorMessage ? (<Alert variant={'danger'}>
                            {errorMessage}
                        </Alert>) : null}
                        <Button
                            type={'submit'}
                            variant="primary">
                            {isLoading ? 'Converting...' : 'Convert'} <IconSend/>
                        </Button>{' '}
                        <Button
                            onClick={loadSampleSVG}
                            variant="link">
                            or load a sample
                        </Button>
                    </Form>
                )
            }
        </div>
    );
}

export default Sidebar
