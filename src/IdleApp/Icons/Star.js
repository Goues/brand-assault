import { forwardRef } from 'react'

const Star = (props, ref) => {
	return (
		<svg width='14' height='14' viewBox='0 0 14 14' fill='none' {...props} ref={ref}>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M14 5.33474L8.967 4.87789L7 0L5.033 4.88526L0 5.33474L3.822 8.82L2.674 14L7 11.2516L11.326 14L10.185 8.82L14 5.33474Z'
				fill='#FBBC05'
			/>
		</svg>
	)
}

export default forwardRef(Star)
