import '../App.css';
import DatasetSplitPane, {
    DatasetSplitPaneBottom,
    DatasetSplitPaneLeft,
    DatasetSplitPaneRight,
    DatasetSplitPaneTop,
  } from "../Components/DatasetSplitPane"; 

import TabPanel from "../Components/TabPanel"
import {Container, 
  Box, 
  Tabs, 
  Tab, 
  Typography} from '@material-ui/core'
import OrganismContext from "..//Contexts/OrganismContext";
import { useState, React} from "react";
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

    return (
      <div className="App">

          <OrganismContext.Provider value={{ organisms, currOrganism, setCurrOrganism }}>
              <DatasetSplitPane className="split-pane-row">
              
                <DatasetSplitPaneLeft>
                  <DatasetSplitPane className="split-pane-col">
                    <DatasetSplitPaneTop />
                    <DatasetSplitPaneBottom />
                  </DatasetSplitPane>
                </DatasetSplitPaneLeft>
                
                <DatasetSplitPaneRight>
                  {/* <Container>
                    <HighchartsReact highcharts={Highcharts} options={options}/>  
                  </Container> */}

                  <Container className='tabbed-panel'>
                    <HighchartsReact highcharts={Highcharts} options={options}/>
                  </Container>
                </DatasetSplitPaneRight> 

              </DatasetSplitPane>
          </OrganismContext.Provider>
      </div>
    );
    }

export default DatasetView;
  