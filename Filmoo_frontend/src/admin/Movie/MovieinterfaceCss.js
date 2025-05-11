import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles(() => ({
    back:{
        height:'100vh',
        width:'100vw',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        overflowX:'hidden'
    },
    box:{
        margin:'auto',
        height:'auto',
        width:'60vw',
        border:'2px solid black',
        display:'flex',
        borderRadius:'15px',
        flexDirection:'column',
        overflow:'hidden'
    },
    title:{
        height:'8vh',
        width:'auto',
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
        fontSize:'1.6rem',
    },
    helperTextStyle:{
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '3px',
    color:'#d32f2f'
    }
}))
export{useStyles}