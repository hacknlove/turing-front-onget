import React from 'react';
import {
  Button, InputAdornment, withStyles,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/VpnKey';
import Formsy from 'formsy-react';
import { set } from 'onget';
import { TextFieldFormsy } from '../../../../components/Formsy';
import styles from './styles';
import './styles.css';

function LoginForm() {
  return (
    <div className="w-full flex flex-row justify-center">
      <Formsy
        onSubmit={(data) => set('localStorage://auth', data)}
        className="bg-white shadow-md rounded px-8 pt-6 mt-6 pb-8 mb-4"
        id="signInForm"
      >
        <TextFieldFormsy
          className="w-full mb-4"
          type="text"
          name="email"
          validations="isEmail"
          validationError="This is not a valid email"
          label="Email"
          InputProps={{
            endAdornment: <InputAdornment position="end"><EmailIcon className="text-20" color="action" /></InputAdornment>,
          }}
          variant="outlined"
          helperText=""
          required
        />

        <TextFieldFormsy
          className="w-full mb-4"
          type="password"
          name="password"
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordIcon className="text-20" color="action" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          helperText=""
          required
        />

        <div className="buttonsHolder">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full logInBtn"
            aria-label="LOG IN"
            value="legacy"
            id="btnFormSignIn"
          >
            Log In
          </Button>
        </div>
      </Formsy>
    </div>
  );
}


export default withStyles(styles)(LoginForm);
