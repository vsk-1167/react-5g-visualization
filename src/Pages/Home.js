import '../App.css';
import { useState, React} from "react";

// Material UI Components
import {Container, 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Grid, 
  Item} from '@material-ui/core'

// Custom Site Components
import {AboutTabs} from "../Components/TabPanel"
import HomeSplitPane, {
    HomeSplitPaneBottom,
    HomeSplitPaneLeft,
    HomeSplitPaneRight,
    HomeSplitPaneTop,
  } from "../Components/HomeSplitPane"; 

// Graphs and Plotting
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';


// Function --> 
function Home() {

    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    return (
      <div className="App">
        <Grid container spacing ={1} columns={2} style= {gridstyle}>
          <Grid item xs={6} md ={4}>
            {/* LEFT PANEL*/}
            <HomeSplitPane className="split-pane-col">
              <HomeSplitPaneTop/>
              <HomeSplitPaneBottom />
            </HomeSplitPane>
          </Grid>

          <Grid item xs={6} md={8} >
            {/*RIGHT PANEL*/}
            <Container className='tabbed-panel'>
              <AboutTabs></AboutTabs>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default Home;
  