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

// Graphs and Plotting
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


// demo data for chart visualization (switch to hard-code)
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

// demo data for table in tabulator
const columns = [
  { headerName: "Name", field: "name", sortable: true, filter: true },
  { headerName: "Age", field: "age", sortable: true, filter: true},
  { headerName: "Favourite Color", field: "col",sortable: true, filter: true},
  { headerName: "Date Of Birth", field: "dob", sortable: true, filter: true},
  { headerName: "Rating", field: "rating", sortable: true, filter: true },
  { headerName: "Passed?", field: "passed", sortable: true, filter: true}
];
var table_data = [
  {name:"Oli Bob", age:"12", col:"red", dob:""},
  {name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
  {name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
  {name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
  {name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];

function DatasetView() {

    //const [currOrganism, setCurrOrganism] = useState(1);
    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    const itemstyle = {
      display: "flex", 
      flexDirection: "column"
    }

    return (
      <div className="App">
        <Grid container spacing ={1} columns={2} style= {gridstyle} >
          <Grid item xs={6} md ={4} style={itemstyle}>
            {/* LEFT PANEL*/}
            <DatasetSplitPane className="split-pane-col">
                <DatasetSplitPaneTop />
                <DatasetSplitPaneBottom />
            </DatasetSplitPane>
          </Grid>

          <Grid item xs={6} md={8} style={itemstyle}>
            {/*RIGHT PANEL*/}
            <Container className='tabbed-panel'>
              <HighchartsReact highcharts={Highcharts} options={options}/>
              <div className="ag-theme-alpine"
                style={{
                  width: '100%', 
                  height: "100%"
              }}>
                <AgGridReact
                  columnDefs={columns}
                  rowData={table_data}
                />
              </div>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default DatasetView;
  