'use client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import { useId, useState } from 'react';

interface Props {
  label?: string;
  options: { value: string; label: string }[];
  onSelect?: (selectedItem: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}

const Select: React.FC<Props> = ({
  label,
  options,
  onSelect,
  disabled = false,
  defaultValue,
}) => {
  const selectId = useId();
  const [value, setValue] = useState<string>(defaultValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onSelect?.(event.target.value);
  };

  return (
    <FormControl fullWidth disabled={disabled}>
      {label ? <InputLabel id={selectId}>{label}</InputLabel> : null}
      <MuiSelect
        id={selectId}
        value={value}
        label={label ?? ''}
        onChange={handleChange}
      >
        {options.map(({ value, label }) => {
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

export { Select };
