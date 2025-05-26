import React from 'react';

import { Link } from 'react-router-dom';

import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { withLanguage } from '@/contexts/LanguageContext';
import { LanguageContextType } from '@/types/LanguageContext/LanguageContext.type';

class MainPage extends React.Component<LanguageContextType> {
  handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value as
      | 'default'
      | 'ko'
      | 'en'
      | 'ja';
    this.props.setLanguage(selectedLanguage);
    console.log('언어 변경', selectedLanguage);
  };

  render() {
    const { currentLanguage } = this.props;

    return (
      <div>
        <Link to='/notice'>공지사항 페이지로 이동</Link>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size='small'>
          <InputLabel id='demo-select-small-label'>Language</InputLabel>
          <Select
            value={currentLanguage}
            onChange={this.handleChange}>
            <MenuItem value='default'>기본 언어</MenuItem>
            <MenuItem value='ko'>한국어</MenuItem>
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='ja'>日本語</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withLanguage(MainPage);
