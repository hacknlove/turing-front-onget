import React from 'react';
import {
  Snackbar, IconButton, withStyles, SnackbarContent, Slide,
} from '@material-ui/core';
import { green, amber, blue } from '@material-ui/core/colors';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Warning from '@material-ui/icons/Warning';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Info from '@material-ui/icons/Info';
import Close from '@material-ui/icons/Close';
import classNames from 'classnames';
import { useOnGet, set } from 'onget';

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
    color: '#ffffff',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  },
  info: {
    backgroundColor: blue[600],
    color: '#ffffff',
  },
  warning: {
    backgroundColor: amber[600],
    color: '#ffffff',
  },
});

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <ErrorOutline />,
  info: <Info />,
};

function Toast({ classes }) {
  const toast = useOnGet('fast://toast');
  if (!toast) {
    return null;
  }
  return (
    <Snackbar
      open
      onClose={() => set('fast://toast', false)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={(props) => (<Slide {...props} direction="down" />)}
    >
      <SnackbarContent
        className={classNames(classes[toast.variant])}
        message={(
          <div className="flex items-center">
            {variantIcon[toast.variant] && variantIcon[toast.variant]}
            <span className="pl-2">{toast.message}</span>
          </div>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => set('fast://toast', false)}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default withStyles(styles)(Toast);
