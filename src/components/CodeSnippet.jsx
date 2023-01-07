import {useState} from "react";
import {Button} from "react-bootstrap";
import {CopyBlock, github} from "react-code-blocks";

function CodeSnippet({icon, symbol}) {
    const [show, setShow] = useState(false);

    return (
        <>
            {
                show ? (
                    <>
                        <CopyBlock
                            text={icon}
                            language={'jsx'}
                            showLineNumbers={false}
                            theme={github}
                            codeBlock
                        />
                        <br/>
                        <CopyBlock
                            text={symbol}
                            language={'jsx'}
                            showLineNumbers={false}
                            theme={github}
                            codeBlock
                        />
                    </>
                ) : null

            }

            <Button className={'mt-3'} onClick={() => setShow(!show)}>{!show ? 'Show Code' : 'Hide Code'}</Button>
        </>
    );
}

export default CodeSnippet
