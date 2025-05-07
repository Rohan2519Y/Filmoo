import {useStyles} from "./MovieinterfaceCss"
export default function MovieInterface(){
    const classes = useStyles()
    return (
        <div className={classes.back}>
            <div className={classes.box}>
                <div className={classes.title}></div>
            </div>
        </div>
    )
}