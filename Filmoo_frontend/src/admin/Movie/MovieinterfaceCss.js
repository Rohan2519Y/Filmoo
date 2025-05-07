import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles(() => ({
    back:{
        height:'100vh',
        width:'100vw',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        height:'40vh',
        width:'50vw',
        border:'2px solid black',
        display:'flex'
    },
    title:{
        height:'7vh',
        width:'100vw',
        border:'1px solid black',
        background:''
    }
}))
export{useStyles}