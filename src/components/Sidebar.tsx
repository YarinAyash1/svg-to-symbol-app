import {Form} from "react-bootstrap";
import React, {ReactElement, useContext, useEffect, useRef, useState} from "react";
import {buildHtml, getSampleSVG, getUuid} from "../helper";
import axios from "axios";
import DragDropFile from "./DragDropFile";
import {SvgConvertorContext} from "../context/SvgConvertorContext";

type SidebarProps = {
    title: string,
    description: ReactElement,
    formConvertor: JSX.Element,
    allowUploader: boolean
};

function Sidebar({title, description, allowUploader = false, formConvertor}: SidebarProps) {
    const {results, setResults} = useContext(SvgConvertorContext);
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
        console.log(results)
        if (!results.length) return;
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(results));
    }, [results])

    const clearInputs = () => {
        setErrorMessage('')
        setTextArea('')
        setSvgName('')
    }


    return (
        <div className={'position-sticky top-0 pt-3 pe-lg-5'}>
            <h1 className="title">{title}</h1>
            {description}
            <hr className={'opacity-25'}/>
            {
                allowUploader ? (
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={!allowUpload ? 'Switch to upload files' : 'Switch to inline svg'}
                        onChange={e => setAllowUpload(e.target.checked)}
                    />
                ) : null
            }
            {
                allowUpload ? (
                    <DragDropFile
                        onSuccess={onSuccess}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}/>
                ) : (
                    formConvertor
                )
            }
        </div>
    );
}

export default Sidebar
