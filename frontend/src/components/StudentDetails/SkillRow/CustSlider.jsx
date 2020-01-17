import React from 'react';
import { Typography, Slider } from '@material-ui/core';

function CustSlider(props) {
	const { title = 'Title', initVal = 1, ...rest } = props;
	return (
		<div className={props.className}>
			<Typography id={'discrete-slider' + title} gutterBottom>
				{title}
			</Typography>
			<Slider
				defaultValue={initVal}
				aria-labelledby={'discrete-slider' + title}
				valueLabelDisplay='auto'
				step={1}
				marks
				min={1}
				max={5}
				{...rest}
			/>
		</div>
	);
}

export default CustSlider;
