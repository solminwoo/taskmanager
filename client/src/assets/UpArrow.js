import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	:hover {
		cursor: pointer;
	}
`;
const DownArrow = () => {
	return (
		<Container>
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
			</svg>
		</Container>
	);
};
export default DownArrow;
