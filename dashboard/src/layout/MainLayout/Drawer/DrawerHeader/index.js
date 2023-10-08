import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from '../../../../assets/images/icons/logo.png';
import { Link } from '../../../../../node_modules/react-router-dom/dist/index';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Link to="/">
          <img src={logo} alt="Mantis" width="100" />
        </Link>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
