import React from 'react';

import { Link } from 'react-router-dom';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Link to='/notice'>공지사항 페이지로 이동</Link>
      </div>
    );
  }
}

export default MainPage;
