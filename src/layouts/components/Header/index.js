import React from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';

export default function Header({ classes }) {
  return (
    <div>
      <TopBar />
      <NavBar classes={classes} />
    </div>
  );
}
