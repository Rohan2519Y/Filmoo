import { useStyles } from "./MovieinterfaceCss"
export default function MovieInterface() {
    const classes = useStyles()
    return (
        <div className={classes.back}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Add Movie</div>
                    <img src="/verification.png"></img>
                </div>
            </div>
        </div>
    )
}