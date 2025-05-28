import React, { Component } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Pagination, PaginationItem, Box } from '@mui/material';

import {
  RouterPaginationProps,
  RouterPaginationClassProps,
} from '@/types/components/RouterPagination.type';

// useLocation 훅을 사용해서 location을 받기 위한 래퍼 컴포넌트
const RouterPaginationWrapper: React.FC<RouterPaginationProps> = (props) => {
  const location = useLocation();
  return (
    <RouterPaginationClass
      {...props}
      location={location}
    />
  );
};

class RouterPaginationClass extends Component<RouterPaginationClassProps> {
  render() {
    const { count, basePath, location, sx = {} } = this.props;

    if (!count || count <= 0) {
      return null;
    }

    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, ...sx }}>
        <Pagination
          page={page}
          count={count}
          size='large'
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${basePath}${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Box>
    );
  }
}

export default RouterPaginationWrapper;
