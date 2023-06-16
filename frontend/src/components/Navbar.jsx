import { Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <Stack
    direction="row"
    alignItems={"center"}
    sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-around' }}
    spacing={2}>
        <Link to="/" style={{ display:'flex', alignItems: 'center' }}>
            <img src={"cooking.png"} alt="logo" style={{ height: '50px', width: '60px' }} />
            <div class="header-nav">Cooking Assist</div>
        </Link>
  </Stack>;
}

export default Navbar