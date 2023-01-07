import {Alert, Button, Form} from "react-bootstrap";
import IconSend from "./icons/SendIcon.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {buildHtml, getSampleSVG, getUuid} from "../helper.js";
import axios from "axios";
import {ResultsContext} from "../context.jsx";

function Sidebar() {
    const {results, setResults} = useContext(ResultsContext);
    const [textArea, setTextArea] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmittedStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const textAreaRef = useRef(null);

    const loadSampleSVG = () => {
        setTextArea(getSampleSVG)
        setSubmittedStatus(true);
    }

    useEffect(() => {
        if (!submitted) return;

        handleSubmit();

        return setSubmittedStatus(false)
    }, [submitted])


    useEffect(() => {

    }, [])

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        if(!textArea) {
            setErrorMessage('Please add your svg');
            textAreaRef.current.focus();
            return;
        }
        setIsLoading(true);
        axios.post(`${import.meta.env['VITE_API_URL']}/convert-to-symbol`, {svgData: textArea}, {
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

    function onSuccess(response) {
        const uuid = getUuid();
        const svg = response.data.input;
        const compiledSamples = buildHtml(response.data.symbol, uuid);
        let newResults = [{
            svg,
            symbol: compiledSamples.symbol,
            icon: compiledSamples.icon,
            codeSample: compiledSamples.symbolExample,
            time: new Date()
        }, ...results];
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(newResults));

        setResults(newResults);

        setErrorMessage('')
        setTextArea('')
        setIsLoading(false);
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
            <hr className={'opacity-25'} />
            <Form onSubmit={handleSubmit}>
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


        </div>
    );
}

export default Sidebar
