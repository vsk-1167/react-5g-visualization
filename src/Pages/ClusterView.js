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
import ClusterSplitPane, {
    ClusterSplitPaneBottom,
    ClusterSplitPaneLeft,
    ClusterSplitPaneRight,
    ClusterSplitPaneTop,
  } from "../Components/ClusterSplitPane"; 
import ClusterTabPanel from '../Components/ClusterTabPanel';

/**
 * Handles the page rendering for the "cluster-level" view within a specific dataset
 */
function ClusterView() {

    const itemstyle = {
      display: "flex", 
      flexDirection: "column", 
      justify: 'stretch'
    }

    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0
    }

    return (
      <div className="App">
        <Grid container spacing ={1} columns={2} style= {gridstyle} >
          <Grid item xs={6} md ={3} style={itemstyle}>
            {/* LEFT PANEL --> labels for page*/}
            <ClusterSplitPane className="split-pane-col">
                <ClusterSplitPaneTop />
                <ClusterSplitPaneBottom />
            </ClusterSplitPane>
          </Grid>

          <Grid item xs={6} md={9} style={itemstyle}>
            {/*RIGHT PANEL --> data content*/}
            <Container className='tabbed-panel'>
              <ClusterTabPanel/>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default ClusterView;
  