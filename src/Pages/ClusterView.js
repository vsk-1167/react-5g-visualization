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
import {ClusterTabs} from "../Components/TabPanel";


function ClusterView() {

    const itemstyle = {
      display: "flex", 
      flexDirection: "column"
    }

    //const [currOrganism, setCurrOrganism] = useState(1);
    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    return (
      <div className="App">
        <Grid container spacing ={1} columns={2} style= {gridstyle} >
          <Grid item xs={6} md ={3} style={itemstyle}>
            {/* LEFT PANEL*/}
            <ClusterSplitPane className="split-pane-col">
                <ClusterSplitPaneTop />
                <ClusterSplitPaneBottom />
            </ClusterSplitPane>
          </Grid>

          <Grid item xs={6} md={9} style={itemstyle}>
            {/*RIGHT PANEL*/}
            <Container className='tabbed-panel'>
              <ClusterTabs/>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default ClusterView;
  