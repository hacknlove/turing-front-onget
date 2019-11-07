import React from 'react';
import Button from '@material-ui/core/Button';
import {
  withStyles, Link, Badge, Hidden,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import { set, useOnGet } from 'onget';
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
  const user = useOnGet('localStorage://auth');
  const cart = useOnGet('dotted://cart', {
    first: {
      count: 0,
      total: 0,
    },
  });

  return (
    <AppBar className={classes.topBar}>
      <Toolbar className={classes.toolbar}>
        <div className={`${classes.authText} ${classes.divTopBar}`}>
          {
            user
              ? (
                <>
                  <span>
                    Hi&nbsp;
                    {user.customer.name}
                    !
                  </span>
                  <Link className={classes.authLink} style={{ color: 'red' }}>
                    My Profile
                  </Link>
                  <span>|</span>
                  <Link onClick={() => set('localStorage://auth', false)} className={classes.authLink} id="btnLogout" style={{ color: 'red' }}>
                    Logout
                  </Link>
                </>
              )
              : (
                <>
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
                      set('fast://authMode', true);
                    }}
                    className={classes.authLink}
                    id="btnRegister"
                    style={{ color: 'red' }}
                  >
                    Register
                  </Link>
                </>
              )
          }
        </div>
        <Hidden mdDown className={classes.divTopBar}>
          <div className={classes.linksContainer}>
            {
              links.map((item) => (
                <Button key={item.title} classes={{ root: classes.button }}>
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
        {
          cart.count && (
            <div className={classes.divTopBar}>
              <div
                className={classes.iconContainer}
                id="menuCartLink"
                onClick={() => set('fast://cartVisible', true)}
              >
                <Badge
                  classes={{ badge: classes.badge }}
                  badgeContent={cart.count}
                  color="primary"
                >
                  <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-black.svg"/>
                </Badge>
              </div>
              <div className={classes.yourBag} style={{ color: 'black' }}>
                Your Bag: $
                <span id="menuCartTotalPrice">{cart.total}</span>
              </div>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles, { withTheme: true })(TopBar);
