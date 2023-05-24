import React from "react";
import { useState } from "react";

//design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const [email, setemail] = useState();
const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Button variant="outlined">Outlined</Button>
    </div>
  );
};

export default Login;
