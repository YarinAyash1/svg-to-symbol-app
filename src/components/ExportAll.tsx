import {Button, Modal, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {ResultsItem} from "../context";
import {CodeBlock, ocean} from "react-code-blocks";

const ExportAll = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exportData, setExportData] = useState<string>('');
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCopy = () => {
        navigator.clipboard.writeText(exportData)
        setCopied(true)
    }

    const handleDownload = () => {
        const l = document.createElement("a");
        l.href = "data:text/plain;charset=UTF-8," + exportData;
        l.setAttribute("download", 'symbols.svg');
        l.click();
        handleClose();
        l.remove();
    }

    const handleExport = () => {
        setIsLoading(true);
        const storedResults = localStorage.getItem('svg-to-symbol-converter');

        if (!storedResults)
            return;

        const symbols = JSON.parse(storedResults).map((i: ResultsItem) => i.codeSample);

        axios.post(`${import.meta.env['VITE_API_URL']}/export-all`, {
            symbols
        }, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setExportData(response.data.data);
                handleShow();
                setCopied(false)

            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <>
            <button className="btn export-all" onClick={handleExport}>
                Export All Symbols
                {
                    isLoading ? (<Spinner size={'sm'} style={{
                        marginLeft: '10px',
                        paddingTop: '5px'
                    }}/>) : null
                }
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{border: "unset"}}>

                </Modal.Header>
                <Modal.Body>
                    <CodeBlock
                        text={exportData}
                        language={'html'}
                        showLineNumbers={false}
                        theme={ocean}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCopy}>
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                    {/*<Button variant="primary" onClick={handleDownload}>*/}
                    {/*    {'Download File'}*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ExportAll;
