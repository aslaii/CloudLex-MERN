import React from "react";
import { useState, useContext } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import { register } from "../api/user";
import { UserContext } from "../UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setpassword(newPassword);
    if (!newPassword) {
      setConfirmPassword("");
    }
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await register({ username, email, password });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        // redirect the user to login
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2000 ms delay
    }
  };

  return !user ? (
    <Container maxWidth="sm" className="">
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
            <AppRegistrationIcon />
          </Avatar>
          <h2>Signup</h2>
        </Grid>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          {/* Email Form */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          {/* Password Form */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              fullWidth
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
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

          <FormControl fullWidth margin="normal">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              required
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              disabled={!password}
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></OutlinedInput>
          </FormControl>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={ConfirmPassword}
            onChange={(isValid) => {}}
          />
          {/* Button */}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !email || !password || !username || !ConfirmPassword || loading
            }
            loading={loading}
            loadingIndicator="Loading…"
            onClick={async (e) => {
              await handleRegister(e);
            }}
          >
            Sign Up
          </LoadingButton>
          <Link href="/login">Have an Account?</Link>
        </Box>
      </Box>
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

export default Signup;
