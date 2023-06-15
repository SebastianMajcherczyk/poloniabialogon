import * as React from "react";
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';


export const FooterCard = styled(Paper)({
    minHeight: '158px',
    minWidth: '182px',
    margin: '10px 5px',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '8px 8px 24px 0px rgba(0, 0, 0, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    '&:hover': {
        boxShadow: '10px 10px 30px 0px rgba(0, 0, 0, 1)',
    },
});
