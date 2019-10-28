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

function Toast({ classes, options }) {
  const state = useOnGet('fast://toastVisible', { first: false });
  if (!state) {
    return null;
  }
  return (
    <Snackbar
      open={state}
      onClose={() => set('fast://toastVisible', false)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={(props) => (<Slide {...props} direction="down" />)}
    >
      <SnackbarContent
        className={classNames(classes[options.variant])}
        message={(
          <div className="flex items-center">
            {variantIcon[options.variant] && variantIcon[options.variant]}
            <span className="pl-2">{options.message}</span>
          </div>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => set('fast://toastVisible', false)}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default withStyles(styles)(Toast);
