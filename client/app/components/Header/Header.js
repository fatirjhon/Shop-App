import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Home</Link>

    <nav>
      <Link to="/Signup">Sign Up</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
