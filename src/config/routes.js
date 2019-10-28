import React from 'react';
import { Redirect } from 'react-router-dom';
import { set } from 'onget';
import Helpers from '../utils/Helpers';
import HomeConfig from '../screens/Home/HomeConfig';
import ProductConfig from '../screens/Product/ProductConfig';

const routeConfigs = [
  ProductConfig,
  HomeConfig,
];
const routes = [
  ...Helpers.generateRoutesFromConfigs(routeConfigs),
  {
    component: function Error404() { return <Redirect to="/404"/>; },
  },
];

set('fast://routes', routes);
