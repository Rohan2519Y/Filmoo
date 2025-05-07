import { makeStyles } from '@mui/styles';
const useStyles=makeStyles(()=>({
    root:{
        display:'flex',
        width:'100%',
        height:'100%',
        background:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        display:'flex',
        width:'600',
        height:'4000',
        border:'2px solid black'
    }
}))
export {useStyles}