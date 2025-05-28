import { Location } from 'react-router-dom';

export interface RouterPaginationProps {
  count: number;
  basePath: string;
  sx?: object;
}

export interface RouterPaginationClassProps extends RouterPaginationProps {
  location: Location;
}