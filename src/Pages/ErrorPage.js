import '../App.css';
import { useState, React} from "react";

// Material UI Components
import {Container, 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Grid, 
  Card,
  CardContent, 
    Button} from '@material-ui/core'

import { useNavigate } from 'react-router';

/**
 * Handles the page rendering for the "dataset-level" view for a selected dataset
 */
function ErrorPage() {

    const itemstyle = {
      display: "flex", 
      flexDirection: "column"
    }

    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    return (
      <div className="App">
            <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                        <Typography variant="h2" component="h2">
                            Couldn't Find Page 
                        </Typography>
                        <br></br>
                        <Button variant="contained" onClick={() => {
                            routeChange("/react-5g-visualization/home");
                        }}>
                            Return Home
                        </Button>
                        </CardContent>
            </Card>
      </div>
    );
    }

export default ErrorPage;
  