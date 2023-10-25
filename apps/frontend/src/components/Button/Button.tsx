import MuiButton from '@mui/material/Button';

const Button: React.FC<React.ComponentProps<typeof MuiButton>> = (props) => {
  return <MuiButton {...props} />;
};

export { Button };
