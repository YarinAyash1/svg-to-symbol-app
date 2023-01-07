function IconSend(props) {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			viewBox="0 0 24 24"
			height="1em"
			width="1em"
			{...props}
		>
			<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
		</svg>
	);
}

export default IconSend;
