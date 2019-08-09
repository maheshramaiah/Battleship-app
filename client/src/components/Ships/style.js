import styled from 'styled-components';

export const Ships = styled.ul`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	list-style-type: none;
	margin: 30px 0 0 0;
	padding: 0;

	input {
		display: inline-block;
		border: 0;
		padding: 5px;
		box-sizing: border-box;
		background: transparent;
		border-bottom: 1px solid #fff;
		color: #fff;
		margin-right: 10px;
		width: 200px;
		font-size: 14px;

		&:focus {
			outline: none;
    }
    
    &:disabled {
      opacity: 0.5;
    }
	}

	li {
		padding: 5px;
	}
`;

export const ShipName = styled.span`
	display: inline-block;
	min-width: 250px;
	color: #fff;
`;
