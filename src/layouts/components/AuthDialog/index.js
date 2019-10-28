import React from 'react';
import {
  Paper,
  Dialog,
  DialogContent,
  withStyles,
  Link,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useOnGet, set } from 'onget'
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import styles from './styles';

function PaperComponent(props) {
  return (
    <Paper {...props}
      style={{
        width: 'auto',
        maxWidth: '450px',
        height: 'auto',
      }}
    />
  );
}

function handleClose() {
  set('fast://authVisible', false)
}

function handleRegisterNav() {
  set('fast://authMode', true)
}

function handleLoginNav() {
  set('fast://authMode', false)
}

function AuthDialog ({ classes }) {
  const open = useOnGet('fast://authVisible')
  const register = useOnGet('fast://authMode')
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent style={{overflow: 'hidden'}}>
          <div className="flex mb-4 h-8">
            <div className="w-3/4">
              {register &&
                <span className={classes.titleText}>Register / Sign Up</span>
              }
              {!register &&
                <span className={classes.titleText}>Log In</span>
              }
            </div>
            <div className="w-1/4 flex justify-end">
              <Close onClick={handleClose} style={{cursor: 'pointer'}} />
            </div>
          </div>
          <div className="w-full flex flex-grow flex-col">
            {register ? <RegisterForm/> : <LoginForm/>}
          </div>
          <div>
            <div className="w-full flex justify-center">
              {register && <Link color="primary"
                        className={classes.submitButtonText}
                        onClick={handleLoginNav}
                        style={{color: 'red'}}
              >
                Go to Login</Link>}
            </div>
            <div className="w-full flex justify-center">
              {!register &&
                <Link color="primary"
                className={classes.submitButtonText}
                onClick={handleRegisterNav}
                style={{color: 'red', marginLeft: '3px'}}
                >
                Register / Sign Up
                </Link>
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(AuthDialog);
