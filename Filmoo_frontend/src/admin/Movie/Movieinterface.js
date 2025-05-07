import { useStyles } from "./MovieinterfaceCss"
import {Button, Grid, TextField} from "@mui/material"
export default function MovieInterface() {
    const classes = useStyles()
    return (
        <div className={classes.back}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Add Movie</div>
                    <img src="/verification.png" style={{height:'8vh'}}></img>
                </div>
                <div style={{margin:10}}>
                    <Grid container spacing={2}>
                        <Grid  size={6}>
                            <TextField label="Name" fullWidth></TextField>
                        </Grid>
                        <Grid  size={6}>
                            <TextField label='Description' fullWidth></TextField>
                        </Grid>
                        <Grid  size={6}>
                            <TextField label='Photo' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField label='Genre' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField label='Year' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField label='Category' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" fullWidth>Submit</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}