import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import NavBar from "./NavBar";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f4f7fb",
  borderRadius: "8px",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
});

const ProfilePage = () => {
  return (
    <>
      <NavBar />
        <StyledBox>
          <Card
            sx={{
              maxWidth: "900px",
              width: "100%",
              paddingBottom: "30px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              {/* Profile Header */}
              <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar
                  alt="User Name"
                  src="https://www.example.com/avatar.jpg" // Replace with dynamic user image if available
                  sx={{
                    width: 120,
                    height: 120,
                    marginBottom: "20px",
                    marginX: "auto",
                  }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                  John Doe
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Software Engineer | React Developer | AI Enthusiast
                </Typography>
              </Box>

              {/* Profile Details */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value="John Doe" // Static, but you can bind this to state for dynamic updates
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value="johndoe@example.com" // Static, bind this to state
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    value="I am a passionate developer with experience in ReactJS and AI technologies. I love coding, learning new things, and solving real-world problems."
                    multiline
                    rows={4}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>

              {/* Edit Profile Button */}
              <Box sx={{ textAlign: "center", marginTop: "30px" }}>
                <Button variant="contained" color="primary" size="large">
                  Edit Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </StyledBox>
    </>
  );
};

export default ProfilePage;
