import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import styles from './styles';

function Banner({ classes }) {
  return (
    <Paper className={classes.paperContainer}>
      <div className={classes.gridItemsContainer}>
        <div className={classes.gridTitle}>
          Converse
        </div>
        <div className={classes.gridSubtitle}>
          Explore styles tough enough to handle all your workouts
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Banner);
