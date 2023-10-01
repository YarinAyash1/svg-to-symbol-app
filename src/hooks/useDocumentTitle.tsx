// useDocumentTitle.js
import {useRef, useEffect} from 'react'

type useDocumentTitleProps = {
    title: string,
    prevailOnUnmount?: boolean,
}

function useDocumentTitle({title, prevailOnUnmount = false}: useDocumentTitleProps) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [])
}

export default useDocumentTitle
