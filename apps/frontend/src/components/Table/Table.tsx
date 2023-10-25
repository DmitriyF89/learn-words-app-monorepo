import { ReactNode } from 'react';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiPaper from '@mui/material/Paper';

interface Props {
  tableHeadCells: { key: string; value: string }[];
  tableBodyRows: { key: string; cells: { key: string; value: ReactNode }[] }[];
}

const Table: React.FC<Props> = ({ tableBodyRows, tableHeadCells }) => {
  return (
    <MuiTableContainer component={MuiPaper}>
      <MuiTable>
        <MuiTableHead>
          <MuiTableRow>
            {tableHeadCells.map(({ key, value }) => (
              <MuiTableCell key={key}>{value}</MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {tableBodyRows.map(({ key, cells }) => {
            return (
              <MuiTableRow key={key}>
                {cells.map(({ key, value }) => {
                  return <MuiTableCell key={key}>{value}</MuiTableCell>;
                })}
              </MuiTableRow>
            );
          })}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};

export { Table };
