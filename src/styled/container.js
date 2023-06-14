import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const ContainerStyled = styled(Box)`
	position: relative;
	text-align: center;
	color: ${props => props.theme.palette.primary.main};
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background-size: cover;
	background-position: center;
	position: relative;
	background-attachment: fixed;
	
`;

