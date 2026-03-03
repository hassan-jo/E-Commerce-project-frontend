import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Please fill required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const data = await loginUser(email, password);

      if (!data.accessToken) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      login(data.accessToken, data.role);
      navigate("/");

    } catch {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">

      <Box sx={{ mt: 16, mb: 6 }}>

        <Card
          sx={{
            p: 5,
            borderRadius: "24px",
            boxShadow:
              "0 15px 50px rgba(0,0,0,0.08)"
          }}
        >

          <Typography
            variant="h5"
            mb={4}
            textAlign="center"
            fontWeight="700"
          >
            Login
          </Typography>

          {error && (
            <Typography color="error" mb={2} textAlign="center">
              {error}
            </Typography>
          )}

          <Box display="grid" gap={3}>

            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleLogin}
              sx={{
                borderRadius: "14px",
                py: 1.5,
                fontWeight: "700",
                background:
                  "linear-gradient(90deg,#3b82f6,#06b6d4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg,#2563eb,#0891b2)"
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </Box>

        </Card>
      </Box>
    </Container>
  );
}

export default Login;