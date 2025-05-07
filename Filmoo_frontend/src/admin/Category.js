import { useStyles } from "./CategoryCss"
export default function Category() {
    const classes = useStyles()
    return (
        <div style={{width:'100%',height:'100%'}}>
            <div className={classes.root}>
                <div className={classes.box}>
                </div>
                <div>
                    sahil
                </div>
            </div>
        </div>
    )
}