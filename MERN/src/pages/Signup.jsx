import React from "react";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
//design
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  Box,
  Container,
  Grid,
  Avatar,
  FormHelperText,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Signup = () => {
  const [Username, setUsername] = useState("");
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
      showPassword = false;
    }
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
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
            autoComplete="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Email Form */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!email || !password || !Username || !ConfirmPassword}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
