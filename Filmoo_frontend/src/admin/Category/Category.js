import React from 'react';
import { useStyles } from './CategoryCss';
import { Grid, TextField } from '@mui/material';
export default function Category() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid size={12} >
            <TextField style={{background:'white', width:900}} label="Brand Name" fullWidth />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}