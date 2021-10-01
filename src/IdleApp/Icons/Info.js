import { forwardRef } from 'react'

const Info = (props, ref) => {
	return (
		<svg width='16' height='16' viewBox='0 0 16 16' fill='none' {...props} ref={ref}>
			<path d='M8.80001 11V7H7.20001V11H8.80001Z' fill='#717578' />
			<path d='M8.80001 6V4.5H7.20001V6H8.80001Z' fill='#717578' />
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z'
				fill='#717578'
			/>
		</svg>
	)
}

export default forwardRef(Info)
