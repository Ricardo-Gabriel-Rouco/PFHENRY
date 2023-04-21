import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Typography color="secondary">Welcome to the admin home page</Typography>
        <Typography color="secondary">This is the home page for react admin</Typography>
      </CardContent>
    </Card>
  );
};
