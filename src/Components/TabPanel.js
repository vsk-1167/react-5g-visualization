import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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

// Context
import OrganismContext from "../Contexts/OrganismContext";



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


export const DatasetTabs = (props) =>{

  // States
  const [value, setValue] = React.useState(0);
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Context-driven States
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
  var json_api_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/birch_summary_stringlist.json'

  // Temporary Hard-Coded Dataset Matching
  // [TASK: use Azure to directly match the currOrganism dataset to the respective dataset]
  console.log(currOrganismDataset)
  
  
  switch(String(currOrganismDataset)){
    case "0,0":
      console.log("hello")
      json_api_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/kmeans_summary_stringlist.json'
      break;
    case "0,1":
      json_api_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/birch_summary_stringlist.json'
      break;
  }


  useEffect(() => {
    fetch(json_api_url) 
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);
  		
  const columns = [
  { headerName: "Cluster ID", field: "cluster_id", 
      sortable: true, filter: true, pinned: 'left',resizable: true, suppressMovable:true, width: 145},
  { headerName: "Number of Genes", field: "num_genes", 
      sortable: true, filter: true, pinned: 'left',resizable: true, suppressMovable:true, width: 190}, 
  { headerName: "Enriched GO Terms", field: "enriched_go_terms", 
      sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 8000}
  ];


  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Data Table" {...a11yProps(0)} />
          <Tab label="Visualizations" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Container className='table-viewer'>
          <div className="ag-theme-alpine"
                  >
                  <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    domLayout='autoHeight'
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

export const AboutTabs = (props) => {
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