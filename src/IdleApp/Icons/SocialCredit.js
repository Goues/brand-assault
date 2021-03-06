const SocialCredit = ({ width = 20, height = width, ...props }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 20 20' fill='none' {...props}>
			<defs>
				<linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'>
					<stop offset='0%' style={{ stopColor: '#c58019' }} />
					<stop offset='100%' style={{ stopColor: '#dd972d' }} />
				</linearGradient>
			</defs>
			<path
				d='M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10.88 15.76V16.12C10.88 16.6 10.49 17 10 17C9.52 17 9.12 16.61 9.12 16.12V15.7C8.49 15.55 7.19 15.09 6.43 13.6C6.2 13.16 6.42 12.61 6.88 12.42L6.95 12.39C7.36 12.22 7.82 12.39 8.03 12.78C8.35 13.39 8.98 14.15 10.15 14.15C11.08 14.15 12.13 13.67 12.13 12.54C12.13 11.58 11.43 11.08 9.85 10.51C8.75 10.12 6.5 9.48 6.5 7.2C6.5 7.1 6.51 4.8 9.12 4.24V3.88C9.12 3.39 9.52 3 10 3C10.48 3 10.88 3.39 10.88 3.88V4.25C11.95 4.44 12.63 5.01 13.04 5.55C13.38 5.99 13.2 6.63 12.68 6.85C12.32 7 11.9 6.88 11.66 6.57C11.38 6.19 10.88 5.8 10.06 5.8C9.36 5.8 8.25 6.17 8.25 7.19C8.25 8.14 9.11 8.5 10.89 9.09C13.29 9.92 13.9 11.14 13.9 12.54C13.9 15.17 11.4 15.67 10.88 15.76Z'
				fill='url(#grad1)'
			/>
			<rect width='50%' height='100%' transform='skewX(45)' fill='white' style={{ opacity: 0.25 }}>
				<animate attributeName='x' values='-200%;1000%' dur='2.5s' repeatCount='indefinite' />
			</rect>
		</svg>
	)
}

export default SocialCredit
