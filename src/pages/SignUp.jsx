import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function SignUp() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async () => {

    if (!form.username || !form.email || !form.password) {
      setError("Please fill required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const data = await registerUser(
        form.username,
        form.email,
        form.password
      );

      if (data._id) {
        alert("Registration Success");
        navigate("/login");
      } else {
        setError(data.message || "Register failed");
      }

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
            Create Account
          </Typography>

          {error && (
            <Typography color="error" mb={2} textAlign="center">
              {error}
            </Typography>
          )}

          <Box display="grid" gap={3}>

            <TextField
              label="Username"
              name="username"
              fullWidth
              value={form.username}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleRegister}
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
              {loading ? "Processing..." : "Sign Up"}
            </Button>

          </Box>

        </Card>
      </Box>
    </Container>
  );
}

export default SignUp;