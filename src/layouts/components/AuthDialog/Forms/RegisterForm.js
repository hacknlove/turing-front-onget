import React, { useState } from 'react';
import {
  Button, InputAdornment, withStyles,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/VpnKey';
import NameIcon from '@material-ui/icons/Person';
import Formsy from 'formsy-react';
import { set } from 'onget';
import { TextFieldFormsy } from '../../../../components/Formsy';
import styles from './styles';

function RegisterForm() {
  const [disabled, setdisabled] = useState(true);
  return (
    <div className="w-full flex flex-row justify-center">
      <Formsy
        onSubmit={(data) => set('dotted://user', data)}
        onValid={() => setdisabled(false)}
        onInvalid={() => setdisabled(true)}
        className="bg-white shadow-md rounded px-8 pt-6 mt-6 pb-8 mb-4"
        id="registerForm"
      >
        <TextFieldFormsy
          className="w-full mb-4"
          type="text"
          name="name"
          label="Name"
          InputProps={{
            endAdornment: <InputAdornment position="end"><NameIcon className="text-20" color="action"/></InputAdornment>
          }}
          variant="outlined"
          helperText=""
          required
        />

        <TextFieldFormsy
          className="w-full mb-4"
          type="text"
          validations="isEmail"
          validationError="This is not a valid email"
          name="email"
          label="Email"
          InputProps={{
            endAdornment: <InputAdornment position="end"><EmailIcon className="text-20" color="action"/></InputAdornment>
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
                <PasswordIcon className="text-20" color="action"/>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          helperText=""
          required
        />
        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto normal-case"
          aria-label="LOG IN"
          value="legacy"
          id="btnFormRegister"
        >
          Register
        </Button>

      </Formsy>
    </div>
  );
}


export default withStyles(styles)(RegisterForm);
