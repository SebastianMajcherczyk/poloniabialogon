import styled from '@emotion/styled';
import { Button } from '@mui/material';

// export const ButtonStyled = styled(Button)`
// 	background-color: #0e3766;
//     color: white;
// 	margin: 20px auto;
// 	padding: 8px 16px;
// 	&:hover {
// 		background-color: #5c5c5c;
// 	}
// `

export const ButtonStyled = styled('Button')(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
	margin: '20px auto',
	padding: '8px 16px',
	'&:hover': {
		backgroundColor: '#5c5c5c'
	}
}))