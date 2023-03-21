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

// Custom Site Components
import DatasetSplitPane, {
    DatasetSplitPaneBottom,
    DatasetSplitPaneLeft,
    DatasetSplitPaneRight,
    DatasetSplitPaneTop,
  } from "../Components/DatasetSplitPane"; 
import {DatasetTabs, BasicTabs} from "../Components/TabPanel";
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

            <Grid container spacing ={1} columns={2} style= {gridstyle} >
                <Grid item xs={6} md ={3} style={itemstyle}>
                    {/* LEFT PANEL*/}
                    <DatasetSplitPane className="split-pane-col">
                        <DatasetSplitPaneTop />
                        <DatasetSplitPaneBottom />
                    </DatasetSplitPane>
                </Grid>

                <Grid item xs={6} md={9} style={itemstyle}>
                    {/*RIGHT PANEL*/}
                    <Container className='tabbed-panel'>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                        <Typography variant="h2" component="h2">
                            Couldn't Find Page 
                        </Typography>
                        <br></br>
                        <Button variant="contained" onClick={() => {
                            routeChange("/home");
                        }}>
                            Return Home
                        </Button>
                        </CardContent>
                    </Card>
                    </Container>
                </Grid>
            </Grid>
            
      </div>
    );
    }

export default ErrorPage;
  