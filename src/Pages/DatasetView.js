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

// Site Contexts
import OrganismContext from "..//Contexts/OrganismContext";

// Graphs and Plotting
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

// Organisms Locally Stored
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

// demo data for chart visualization
const data = [1, 2, 1, 4, 3, 6] 

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: data
    }
  ]
};

function DatasetView() {

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
                <DatasetSplitPane className="split-pane-col">
                    <DatasetSplitPaneTop />
                    <DatasetSplitPaneBottom />
                </DatasetSplitPane>
              </Grid>

              <Grid item xs={6} md={8} >
                {/*RIGHT PANEL*/}
                <Container className='tabbed-panel'>
                  <HighchartsReact highcharts={Highcharts} options={options}/>
                </Container>
              </Grid>
            </Grid>
          </OrganismContext.Provider>
      </div>
    );
    }

export default DatasetView;
  