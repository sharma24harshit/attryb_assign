import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <Box className="navbar">
        <Link to="/">
          <Box>
            <Button>Home</Button>
          </Box>
        </Link>
        <Link to="/login">
            <Box>
            <Button>Login</Button>
          </Box>
            </Link>

            <Link to="/signup">
            <Box>
            <Button>Signup</Button>
          </Box>
            </Link>
      </Box>
    </div>
  );
};


export default Navbar;