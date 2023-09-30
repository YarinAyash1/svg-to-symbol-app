import {Alert, Button, Form} from "react-bootstrap";
import IconSend from "./icons/SendIcon";
import React, {useContext, useEffect, useRef, useState} from "react";
import {buildHtml, getSampleSVG, getUuid} from "../helper";
import axios from "axios";
import {SvgConvertorContext} from "../context/SvgConvertorContext";


function FormSvgConvertor() {
    const {results, setResults} = useContext(SvgConvertorContext);
    const [textArea, setTextArea] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmittedStatus] = useState<boolean>(false);
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
        if (!results.length) return;
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(results));
    }, [results])

    const clearInputs = () => {
        setErrorMessage('')
        setTextArea('')
        setSvgName('')
    }


    return (
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
    );
}

export default FormSvgConvertor
