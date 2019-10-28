import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'onget';
import Layouts from './Layouts';

const styles = (theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
});

function getRouteSettings(pathname) {
  const routes = get('fast://routes');

  const [matched] = matchRoutes(routes, pathname);

  if (matched && matched.route.settings) {
    return matched.route.settings;
  }
  return { };
}


function LayoutHandler(props) {
  const { classes, location } = props;
  const settings = getRouteSettings(location.pathname);

  if (settings && settings.layout && settings.layout.style) {
    const Layout = Layouts[settings.layout.style];

    return (
      <Layout className={classes.container} {...props} />
    );
  }

  return null;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps() {
  return {};
}

export default withStyles(styles, {
  withTheme: true,
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutHandler)));
