import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const QAPromptDashboard = () => {
  const [feature, setFeature] = useState("");
  const [userStories, setUserStories] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<any[]>([]);

//   const handleGenerateUserStories = async () => {
//     // Replace with actual ChatGPT API call
//     const stories = [
//       "As a user, I want to reset my password so that I can regain access.",
//       "As a security admin, I want to validate email before sending reset link.",
//     ];
//     setUserStories(stories);
//   };

//   const handleGenerateTestCases = async () => {
//     // Replace with actual ChatGPT API call
//     const cases = [
//       {
//         id: "TC001",
//         scenario: "User requests password reset",
//         steps: "1. Click Forgot Password > 2. Enter email > 3. Submit",
//         expected: "Password reset email sent",
//         priority: "High",
//         type: "Positive",
//         preconditions: "User has valid account",
//       },
//       {
//         id: "TC002",
//         scenario: "User enters invalid email",
//         steps: "1. Click Forgot Password > 2. Enter invalid email > 3. Submit",
//         expected: "Error message displayed",
//         priority: "Medium",
//         type: "Negative",
//         preconditions: "None",
//       },
//     ];
//     setTestCases(cases);
//   };
const handleGenerateUserStories = async () => {
    const res = await fetch("http://localhost:8000/generate-user-stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feature }),
    });
  
    const data = await res.json();
    setUserStories(data.stories);
  };
  
  const handleGenerateTestCases = async () => {
    const res = await fetch("http://localhost:8000/generate-test-cases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feature: userStories[0] }), // or a selected story
    });
  
    const data = await res.json();
    // For now, keep as raw output; later, you can parse to structured rows
    setTestCases([{ id: "AI", scenario: "", steps: "", expected: data.test_cases }]);
  };
  return (
    <Grid container spacing={2} padding={4}>
      <Grid size={{ xs: 12,md: 6 }}>
        <Typography variant="h4">QA Prompt Dashboard</Typography>
      </Grid>

      <Grid size={{ xs: 12,md: 6 }}>
        <TextField
          label="Enter Feature/Requirement"
          fullWidth
          multiline
          rows={4}
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12,md: 6 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateUserStories}
          sx={{ mr: 2 }}
        >
          Generate User Stories
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGenerateTestCases}
        >
          Generate Test Cases
        </Button>
      </Grid>

      {userStories.length > 0 && (
        <Grid size={{ xs: 12,md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Generated User Stories</Typography>
              <ul>
                {userStories.map((story, index) => (
                  <li key={index}>{story}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      )}

      {testCases.length > 0 && (
        <Grid size={{ xs: 12,md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Generated Test Cases</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Scenario</TableCell>
                    <TableCell>Steps</TableCell>
                    <TableCell>Expected Result</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Preconditions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testCases.map((tc, index) => (
                    <TableRow key={index}>
                      <TableCell>{tc.id}</TableCell>
                      <TableCell>{tc.scenario}</TableCell>
                      <TableCell>{tc.steps}</TableCell>
                      <TableCell>{tc.expected}</TableCell>
                      <TableCell>{tc.priority}</TableCell>
                      <TableCell>{tc.type}</TableCell>
                      <TableCell>{tc.preconditions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default QAPromptDashboard;
