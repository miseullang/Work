import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

export const StyledListItem = styled.li`
  border-top: 1px solid var(--darkGray);
  list-style: none;
`;

export const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 2.25rem 1.25rem;
  text-decoration: none;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

export const StyledSkeleton = styled.li`
  border-top: 1px solid var(--darkGray);
  list-style: none;
  padding: 2.25rem 1.25rem;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

export const ErrorState = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.25rem 1.25rem;
  text-decoration: none;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;