import React from 'react';

import { Outlet } from 'react-router-dom';

class BaseLayout extends React.Component {
  render() {
  return (
    <div>
      <main className='main-wrapper'>
        <Outlet />
        </main>
      </div>
    );
  }
};

export default BaseLayout;
