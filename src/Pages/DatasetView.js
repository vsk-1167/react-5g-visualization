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
import DatasetSplitPane, {
    DatasetSplitPaneBottom,
    DatasetSplitPaneLeft,
    DatasetSplitPaneRight,
    DatasetSplitPaneTop,
  } from "../Components/DatasetSplitPane"; 
import {DatasetTabs, BasicTabs} from "../Components/TabPanel";


function DatasetView() {

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
            <DatasetSplitPane className="split-pane-col">
                <DatasetSplitPaneTop />
                <DatasetSplitPaneBottom />
            </DatasetSplitPane>
          </Grid>

          <Grid item xs={6} md={9} style={itemstyle}>
            {/*RIGHT PANEL*/}
            <Container className='tabbed-panel'>
              <DatasetTabs/>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default DatasetView;
  