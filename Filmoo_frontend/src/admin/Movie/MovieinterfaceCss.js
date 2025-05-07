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
        width:'40vw',
        border:'2px solid black',
        display:'flex',
        borderRadius:'15px'
    },
    title:{
        height:'8vh',
        width:'100vw',
        background:'#f1c40f',
        borderRadius:'14px 14px 0px 0px',
        display:'flex',
        padding:0,
        margin:0
    },
    image:{
        margin:'3px',
        height:'7vh',
        width:'auto'
    },
    name:{
        margin:'auto',
        height:'auto',
        width:'auto',
        fontSize:'1.6rem'
    }
}))
export{useStyles}