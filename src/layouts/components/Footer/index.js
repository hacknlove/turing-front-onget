import React from 'react';
import { Hidden, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useOnGet } from 'onget';
import Button from '@material-ui/core/Button';
import { Container } from '../../../components/Layout';
import styles from './styles';
import systemConfig from '../../../config/system';

function Footer({ classes }) {
  const departments = useOnGet(`${systemConfig.serverBaseUrl}/departments`, { first: [] });

  return (
    <div className={classes.root}>
      <Container desktopOnly>
        <Hidden smDown>
          <div className={classes.linksContainer}>
            {departments.map((department) => (
              <Button
                key={department.department_id}
                classes={{
                  root: classes.button,
                }}
              >
                <Link to={`/department/${department.department_id}`} className={classes.footerLink}>
                  {department.name}
                </Link>
              </Button>
            ))}
          </div>
        </Hidden>
        <div className={classes.socialContainer}>
          <img
            className={classes.socialIcon}
            alt="instagram"
            src="/assets/icons/instagram/grey.svg"
          />
          <img
            className={classes.socialIcon}
            alt="pinterest"
            src="/assets/icons/pinterest/grey.svg"
          />
          <img
            className={classes.socialIcon}
            alt="twitter"
            src="/assets/icons/twitter/grey.svg"
          />
          <img
            className={classes.socialIcon}
            alt="facebook"
            src="/assets/icons/facebook/grey.svg"
          />
        </div>
      </Container>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Footer);
