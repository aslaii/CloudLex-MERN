import React from "react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

//design
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Box,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";

import { login } from "../api/user";

const Login = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        user(res.username);
        // redirect the user to home
      }
      q;
    } catch (err) {
      toast.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
        window.location.reload(false);
        <Navigate to={"/"} />;
      }, 100); // 2000 ms delay
    }
  };

  return !user ? (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Email Form */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          {/* Password Form */}
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
          {/* Button */}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!password || !email || loading}
            loading={loading}
            loadingIndicator="Loading…"
            onClick={async (e) => {
              await handleLogin(e);
            }}
          >
            Login
          </LoadingButton>
          <Link href="/signup">Need Account?</Link>
        </Box>
      </Box>
    </Container>
  ) : (
    <div>
      <Navigate to="/" />
      {/* {toast.error("Unauthorized!")} */}
    </div>
  );
};

export default Login;
