import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>La boite à livre</h1>
      </Link>
    </header>
  );
}
