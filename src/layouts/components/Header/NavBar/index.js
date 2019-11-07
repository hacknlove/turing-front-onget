import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  InputBase, Badge, Drawer, Hidden, IconButton, Button, Toolbar, AppBar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import {
  NavDropdown,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import QueryString from 'query-string';
import { set, useOnGet } from 'onget';
import styles from './styles';
import './style.css';
import systemConfig from '../../../../config/system';

const useStyles = makeStyles(styles, { withTheme: true });

const search = _.debounce((history, q) => {
  history.push(
    q
      ? {
        pathname: '/search',
        search: QueryString.stringify({
          q,
        }),
      }
      : {
        pathname: '/',
        search: '',
      },
  );
}, 500);

export default function NavBar() {
  const history = useHistory();
  const [mobileOpen, setmobileOpen] = useState(false);
  const [activeClass, setActiveClass] = useState('is-ontop');

  const departments = useOnGet(`${systemConfig.serverBaseUrl}/departments`, { first: [] });
  const categories = useOnGet(`${systemConfig.serverBaseUrl}/categories`, { first: { rows: [] } });
  const classes = useStyles(styles);
  const departmentalizedCategories = {};
  departments.forEach((department) => {
    departmentalizedCategories[department.department_id] = [];
  });
  categories.rows.forEach((category) => {
    if (!departmentalizedCategories[category.department_id]) {
      return;
    }
    departmentalizedCategories[category.department_id].push(category);
  });
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

  return (
    <div>
      <AppBar className={`mainHeaderHolder ${classes.appBar}  ${activeClass}`}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.flex}>
            <Link to="/" className={classes.brand}>
              SHOPMATE
            </Link>
          </div>
          <Hidden mdDown>
            <div className={`departments categories ${classes.linksContainer}`}>
              {departments.map((department) => (
                <NavDropdown
                  key={department.department_id}
                  title={department.name}
                  className="department navDropdown"
                >
                  {departmentalizedCategories[department.department_id].map((category) => (
                    <NavDropdown.Item
                      key={category.category_id}
                      onClick={() => {
                        history.push(`/department/${department.department_id}/category/${category.category_id}/1`);
                      }}
                      className="category"
                    >
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </div>
          </Hidden>
          <Hidden mdDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={(event) => search(history, event.target.value)}
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
