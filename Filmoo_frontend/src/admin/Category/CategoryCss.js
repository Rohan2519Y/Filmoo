import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        background: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        display: 'flex',
        width: '60vw',
        height: '40vh',
        border: '2px solid black'
    }
}));

export { useStyles };