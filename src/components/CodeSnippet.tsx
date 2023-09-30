import {useState} from "react";
import {Button} from "react-bootstrap";
import {CopyBlock, github} from "react-code-blocks";

type CodeSnippetProps = {
    icon: string,
    symbol?: string
}

function CodeSnippet({icon, symbol}: CodeSnippetProps) {
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
                        {symbol ? (

                            <CopyBlock
                                text={symbol}
                                language={'jsx'}
                                showLineNumbers={false}
                                theme={github}
                                codeBlock
                            />
                        ) : null}
                    </>
                ) : null

            }

            <Button className={'mt-3'} onClick={() => setShow(!show)}>{!show ? 'Show Code' : 'Hide Code'}</Button>
        </>
    );
}

export default CodeSnippet
