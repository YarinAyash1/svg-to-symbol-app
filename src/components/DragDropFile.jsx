// drag drop file component
import {useEffect, useRef, useState} from "react";
import IconSend from "./icons/SendIcon.jsx";
import {Alert, Button} from "react-bootstrap";
import axios from "axios";
import IconClose from "./icons/IconClose.jsx";

function DragDropFile({onSuccess, setIsLoading, isLoading = false}) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // ref
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.length) {
            setErrorMessage('Please add your svg file');
            inputRef.current.focus();
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("svgFiles", files[i]);
        }


        try {
            const response = await axios.post(`${import.meta.env['VITE_API_URL']}/convert-upload`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (!response.data.symbols) return setErrorMessage('Error!');
            for (const symbol of response.data.symbols) {
                onSuccess({
                    data: symbol
                })
            }
            setErrorMessage('')
            setFiles([])

        } catch (err) {
            console.log(err)
            setErrorMessage('Error!')
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!files.length) return;
        let arrayOfFiles = [];

        for (let i = 0; i < files.length; i++) {
            arrayOfFiles.push(files[i]);
        }

        let images = [];
        arrayOfFiles.map((e) => {
            const ImageUrl = URL.createObjectURL(e);
            images.push(ImageUrl)
        })

        setPreview(images)

        // return () => setFiles([]);
    }, [files])

    // const handleFiles = (files) => {
    // }

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles(prevState => [...prevState, ...e.dataTransfer.files])
            // handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles(prevState => [...prevState, ...e.target.files])
            // handleFiles(e.target.files);
        }
    };

    const removeImageFromArray = (e) => {
        const index = e.target.id;
        let newPreview = [...preview];

        newPreview.splice(index, 1);
        setPreview(newPreview);
    }

// triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form id="form-file-upload" onDragEnter={handleDrag}
              encType="multipart/form-data"
              onSubmit={handleSubmit}>
            <input ref={inputRef} type="file"
                   accept={'image/svg+xml'}
                   name={'svgFiles'} id="input-file-upload" multiple={true}
                   onChange={handleChange}/>
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" type={"button"} onClick={onButtonClick}>Upload a file</button>
                </div>
            </label>
            {dragActive &&
                <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
                     onDrop={handleDrop}></div>}

            {errorMessage ? (<Alert className={'mt-3'} variant={'danger'}>
                {errorMessage}
            </Alert>) : null}
            <div id={'uploaded-files'} className={'mt-3'}>
                {preview.map((img, index) =>
                    (
                        <div className={'file-preview'} key={index}>
                            <img src={img} id={index} alt="pic1" width="50" height="50"/>
                            <Button size={'sm'}
                                    variant="danger"
                                    onClick={(e) => {
                                        removeImageFromArray(e);
                                    }}
                            ><IconClose/></Button>
                        </div>
                    )
                )}
            </div>
            <Button
                type={'submit'}
                className={'mt-3'}
                variant="primary">
                {isLoading ? 'Converting...' : 'Convert'} <IconSend/>
            </Button>

        </form>
    );
};

export default DragDropFile
