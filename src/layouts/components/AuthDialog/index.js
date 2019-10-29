import React from 'react';
import {
  Paper,
  Dialog,
  DialogContent,
  withStyles,
  Link,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useOnGet, set, beforeSet } from 'onget';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import styles from './styles';
import systemConfig from '../../../config/system';

beforeSet('dotted://user', async (context) => {
  context.preventSet = true;
  const url = `${systemConfig.serverBaseUrl}/customers${context.value.name ? '' : '/login'}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.value),
  });

  if (response.error) {
    return set('fast://toast', {
      variant: 'error',
      message: 'Network error',
    });
  }

  const data = await response.json();
  if (data.error) {
    return set('fast://toast', {
      variant: 'error',
      message: data.error.message,
    });
  }

  context.preventSet = false;
  context.value = data;
  set('localStorage://auth', data.accessToken);
  set('fast://authVisible', false);
});

function PaperComponent(props) {
  return (
    <Paper
      {...props}
      style={{
        width: 'auto',
        maxWidth: '450px',
        height: 'auto',
      }}
    />
  );
}

function handleClose() {
  set('fast://authVisible', false);
}

function handleRegisterNav() {
  set('fast://authMode', true);
}

function handleLoginNav() {
  set('fast://authMode', false);
}

function AuthDialog({ classes }) {
  const open = useOnGet('fast://authVisible', { first: false });
  const register = useOnGet('fast://authMode');
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent style={{ overflow: 'hidden' }}>
          <div className="flex mb-4 h-8">
            <div className="w-3/4">
              {
                register
                  ? <span className={classes.titleText}>Register / Sign Up</span>
                  : <span className={classes.titleText}>Log In</span>
              }
            </div>
            <div className="w-1/4 flex justify-end">
              <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="w-full flex flex-grow flex-col">
            {register ? <RegisterForm /> : <LoginForm />}
          </div>
          <div>
            <div className="w-full flex justify-center">
              <Link
                color="primary"
                className={classes.submitButtonText}
                onClick={register ? handleLoginNav : handleRegisterNav}
                style={{ color: 'red' }}
              >
                {
                  register
                    ? 'Go to Login'
                    : 'Register / Sign Up'
                }
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(AuthDialog);
