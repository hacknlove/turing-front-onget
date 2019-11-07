import React from 'react';
import { createGenerateClassName, jssPreset } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { JssProvider } from 'react-jss';
import { create } from 'jss';
import jssExtend from 'jss-extend';
import './config/routes';
import Theme from './components/System/Theme';
import LayoutHandler from './layouts/LayoutHandler';
import './styles/index.css';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Router>
        <Theme>
          <LayoutHandler />
        </Theme>
      </Router>
    </JssProvider>
  );
}

export default App;
