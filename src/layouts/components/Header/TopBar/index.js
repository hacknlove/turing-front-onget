import React from 'react';
import Button from '@material-ui/core/Button';
import {
  withStyles, Link, Badge, Hidden,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import { set } from 'onget'
import styles from './styles';

const links = [{
  title: 'Daily Deals',
  link: '/',
}, {
  title: 'Sell',
  link: '/',
}, {
  title: 'Help & Contact',
  link: '/',
}];

function TopBar({ classes }) {
  return (
    <AppBar className={classes.topBar}>
      <Toolbar className={classes.toolbar}>
        <div className={`${classes.authText} ${classes.divTopBar}`}>
          <span>Hi!</span>
          <Link
            onClick={() => {
              set('fast://authVisible', true);
              set('fast://authMode', false);
            }}
            className={classes.authLink}
            id="btnSignIn"
            style={{ color: 'red' }}
          >
            Sign in
          </Link>
          <span>or</span>
          <Link
            onClick={() => {
              set('fast://authVisible', true);
              set('fast://authMode', false);
            }}
            className={classes.authLink}
            id="btnRegister"
            style={{ color: 'red' }}
          >
            Register
          </Link>
        </div>
        <div className={`${classes.authText} ${classes.divTopBar}`}>
          <span>Hi Charles!</span>
          <Link className={classes.authLink} style={{ color: 'red' }}>
            My Profile
          </Link>
          <span>|</span>
          <Link className={classes.authLink} id="btnLogout" style={{ color: 'red' }}>
            Logout
          </Link>
        </div>
        <Hidden mdDown className={classes.divTopBar}>
          <div className={classes.linksContainer}>
            {
              links.map((item) => (
                <Button key={item.link} classes={{ root: classes.button }}>
                  <Link to={item.link} className={classes.navLink}>
                    {item.title}
                  </Link>
                </Button>
              ))
            }
          </div>
        </Hidden>
        <Hidden mdDown className={classes.divTopBar}>
          <div className={classes.currencyIconContainer}>
            <span className="flag-icon flag-icon-gb" />
          </div>
          <div className={classes.currencyContainer}>
            <div className={classes.currencyText}>GBR</div>
          </div>
        </Hidden>
        <div className={classes.divTopBar}>
          <div
            className={classes.iconContainer}
            id="menuCartLink"
            onClick={() => set('fast://cartVisible', true)}
          >
            <Badge
              classes={{ badge: classes.badge }}
              badgeContent={1}
              color="primary"
            >
              <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-black.svg"/>
            </Badge>
          </div>
          <div className={classes.yourBag} style={{ color: 'black' }}>
            xYour Bag: $
            <span id="menuCartTotalPrice">14.99</span>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles, { withTheme: true })(TopBar);
