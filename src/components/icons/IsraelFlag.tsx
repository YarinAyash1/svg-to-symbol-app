import {SVGProps} from "react";

function IsraelFlag(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 1100 800" width="1100" height="800">
            <path d="M 0,0 H 1100 V 800 H 0 Z" fill="#fff"/>
            <path d="M 0,75 H 1100 V 200 H 0 Z" fill="#0038b8"/>
            <path d="M 0,600 H 1100 V 725 H 0 Z" fill="#0038b8"/>
            <path
                d="M 423.81566,472.85253 H 676.18435 L 550.00001,254.29492 Z m 126.18435,72.85255 126.1843,-218.55765 H 423.81566 Z"
                fill="none" stroke="#0038b8" stroke-width="27.5"/>
        </svg>
    );
}

export default IsraelFlag;
