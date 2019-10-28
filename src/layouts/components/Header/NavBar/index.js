import React, { useState, useEffect } from 'react';
import {
  withStyles, InputBase, Badge, Drawer, Hidden, IconButton, Button, Toolbar, AppBar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import {
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { set, useOnGet } from 'onget';
import styles from './styles';
import './style.css';

function NavBar({ classes }) {
  const [mobileOpen, setmobileOpen] = useState(false);
  const [activeClass, setActiveClass] = useState('is-ontop');
  const brand = useOnGet('fast://brand')

  function handleDrawerToggle() {
    setmobileOpen(!mobileOpen);
  }


  function scrollListener() {
    const scrollpos = window.scrollY;
    if (activeClass === 'is-scrolled') {
      if (scrollpos < 10) {
        setActiveClass('is-ontop');
      }
    } else if (scrollpos > 10) {
      setActiveClass('is-scrolled');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  const brandComponent = (
    <Link to="/" className={classes.brand}>
      {brand}
    </Link>
  );


  return (
    <div>
      <AppBar className={`mainHeaderHolder ${classes.navBar}  ${activeClass}`}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.flex}>
            {brandComponent}
          </div>
          <Hidden mdDown>
            <div className={`departments categories ${classes.linksContainer}`}>
              <NavDropdown
                title="Regional"
                className="department navDropdown"
              >
                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  French
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  Italian
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  Irish
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Nature"
                className="department navDropdown"
              >
                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  Animal
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {}}
                >
                  Flower
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Seasonal"
                className="department navDropdown"
              >
                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  Christmas
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {}}
                  className="category"
                >
                  Valentine&apos;s
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Hidden>
          <Hidden mdDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                name="search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Hidden>
          <Hidden mdDown>
            <div className={classes.iconContainer} onClick={() => set('fast://cartVisible', true)}>
              <Badge
                classes={{
                  badge: classes.badge,
                }}
                id="menuCartQuantity"
                badgeContent={2}
                color="primary"
              >
                <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-white.svg" />
              </Badge>
            </div>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            className="py-12"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <Button classes={{ root: classes.button }}>
              <Link to="/department/1" className={classes.navDrawerLink}>
                Regional
              </Link>
            </Button>
          </Drawer>
        </Hidden>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(NavBar);
