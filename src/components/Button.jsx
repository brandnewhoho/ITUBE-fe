import React from 'react';

export default function Button({ name, handleClick }) {
	return (
		<button
			className='h-10 w-10 bg-brand2 px-4 rounded-full whitespace-nowrap mr-4 text-sm'
			onClick={handleClick}
		>
			{name}
		</button>
	);
}
