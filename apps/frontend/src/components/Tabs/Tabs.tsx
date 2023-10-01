'use client';
import { Fragment } from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import MuiBox from '@mui/material/Box';
import { ReactNode, useState } from 'react';

interface Props {
  tabs: {
    label: string;
    children: ReactNode;
  }[];
}

export const Tabs: React.FC<Props> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MuiBox sx={{ width: '100%' }}>
      <MuiBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange}>
          {tabs.map(({ label }) => (
            <MuiTab label={label} key={label} />
          ))}
        </MuiTabs>
      </MuiBox>
      {tabs.map(({ label, children }) => (
        <Fragment key={label}>
          {tabs[value].label === label ? (
            <div key={label}>{children}</div>
          ) : null}
        </Fragment>
      ))}
    </MuiBox>
  );
};
