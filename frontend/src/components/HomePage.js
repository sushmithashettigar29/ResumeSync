import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToNewResume = () => {
    navigate("/new-resume");
  };
  const navigateToEnhanceResume = () => {
    navigate("/enhance-resume");
  };
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "80vh",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            maxWidth: "800px", // Restrict content width
            width: "100%", // Make it responsive
            padding: "10px",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to ResumeSync
          </Typography>
          <Typography variant="body1" gutterBottom>
          Take control of your career with a standout resume! Whether you’re starting from scratch or enhancing your current resume,
          ResumeSync is here to help you create the perfect profile for job applications.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Do you want to enhance your resume for job applications? Then why
            are you waiting? Just start creating your resume!
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToNewResume}
            >
              Create New Resume
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={navigateToEnhanceResume}
            >
              Enhance Existing Resume
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
