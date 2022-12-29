import * as React from 'react';
import PropTypes from 'prop-types';
import {Container, 
    Box, 
    Tabs, 
    Tab, 
    Typography} from '@material-ui/core'


// Graphs and Plotting
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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
  { headerName: "Date Of Birth", field: "dob", sortable: true, filter: true}
];
var table_data = [
  {name:"Oli Bob", age:"12", col:"red", dob:""},
  {name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
  {name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
  {name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
  {name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];

export const DatasetTabs = (props) =>{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Data Table" {...a11yProps(0)} />
          <Tab label="Visualizations" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Container className='tabbed-panel'>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className='tabbed-panel'>
          <HighchartsReact highcharts={Highcharts} options={options}/>   
        </Container>
      </TabPanel>

    </Box>
  );
}

export const BasicTabs = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Help" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        Description of the software tool 
      </TabPanel>
      <TabPanel value={value} index={1}>
        Instructions for how to use it 
      </TabPanel>

    </Box>
  );
}