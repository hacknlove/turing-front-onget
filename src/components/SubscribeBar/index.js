import React from 'react';
import { withStyles, InputBase, Fab } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import styles from './styles';

function SubscribeBar({ classes }) {
  return (
    <div className={classes.subscribeBar}>
      <div className={classes.toolbar}>
        <div className={classes.mainText}>Subscribe for Shop News, Updates and Special Offers</div>
        <div style={{ flex: 1, flexGrow: 1 }} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <EmailIcon />
          </div>
          <InputBase
            placeholder="Your Email"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <Fab color="primary" size="small" className={classes.subscribeButton}><span className={classes.subscribeText}>Subscribe</span></Fab>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(SubscribeBar);
