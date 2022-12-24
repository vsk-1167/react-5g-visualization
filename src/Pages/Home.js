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
import TabPanel from "../Components/TabPanel"
import HomeSplitPane, {
    HomeSplitPaneBottom,
    HomeSplitPaneLeft,
    HomeSplitPaneRight,
    HomeSplitPaneTop,
  } from "../Components/HomeSplitPane"; 

// Site Contexts
import OrganismContext from "..//Contexts/OrganismContext";

// Graphs and Plotting
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';



// Hard Coded Data: 
const organisms = [
    {
      id: 1,
      name: "E. coli",
      datasets:
        ['iModulome'],
    },
    {
      id: 2,
      name: "M. buryatense",
      datasets: ['kMeans','BIRCH','iModulome'],
    }
  ];

// Function --> 
function Home() {

    // States:
    const [currOrganism, setCurrOrganism] = useState(1); 

    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    return (
      <div className="App">

        <OrganismContext.Provider value={{ organisms, currOrganism, setCurrOrganism }}>

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
                  <TabPanel></TabPanel>
                </Container>
              </Grid>
            </Grid>
        </OrganismContext.Provider>

      </div>
    );
    }

export default Home;
  