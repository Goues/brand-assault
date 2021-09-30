import { forwardRef } from 'react'

const NextWave = (props, ref) => {
	return (
		<svg width='14' height='12' viewBox='0 0 15 12' fill='none' {...props} ref={ref}>
			<path
				d='M8 0C4.68667 0 2 2.68667 2 6H0L2.59333 8.59333L2.64 8.68667L5.33333 6H3.33333C3.33333 3.42 5.42 1.33333 8 1.33333C10.58 1.33333 12.6667 3.42 12.6667 6C12.6667 8.58 10.58 10.6667 8 10.6667C6.71333 10.6667 5.54667 10.14 4.70667 9.29333L3.76 10.24C4.84667 11.3267 6.34 12 8 12C11.3133 12 14 9.31333 14 6C14 2.68667 11.3133 0 8 0ZM7.33333 3.33333V6.66667L10.1867 8.36L10.6667 7.55333L8.33333 6.16667V3.33333H7.33333Z'
				fill='white'
			/>
		</svg>
	)
}

export default forwardRef(NextWave)
