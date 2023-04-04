// Frontend UI 
import React, {useContext, 
    useEffect, 
    useRef,
    useState,} from "react";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';
import {Container,
    Box, 
    Tabs, 
    Tab, 
    Typography} from "@material-ui/core";
import TabPanel from "./TabPanel";

// Data from Azure
import { BlobServiceClient } from "@azure/storage-blob";

// Plotting
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Contexts
import OrganismContext from "../Contexts/OrganismContext";
import ClusterContext from "../Contexts/ClusterContext";

// Data
// demo data for chart visualization (switch to hard-code)

const mockData = [
    [-0.02149442521388592,0.19515254032875265,-0.13805088044252808,-0.33654635204283445,0.25964156768669344,-0.3142582991448828,0.5702429789982939,-0.4503065575952333,0.13462041448347872,-0.1659451259259506,-0.3120757506810627,-0.08834767068952137,-0.3334111721416201,-0.05525312708567267,-0.14741903084281122,0.22634736595820001,-0.1855340516190431,-0.4429697098113627,0.20680945635675715,-0.09775180128989244],
    [0.15418868476687447,0.3820712430119415,0.10576651410056684,-0.10700502058066766,0.5692343389321503,0.19081421072363544,0.3891090325680922,0.13549191929911608,-0.00425565277655086,-0.4236660261367464,0.18697094410434406,-0.08374065082984332,-0.3736657575872425,-0.26719336738562405,0.2693142748439727,-0.2982577918741489,-0.4165681010847379,-0.04075736347256706,0.04473644988160445,0.25830339931631097],
    [0.5841373612031213,-0.19487349691522854,0.060561601901425635,-0.25437194367445226,0.2998571437198797,-0.09237182751903296,0.2799736612598644,0.09196154809360596,0.29987128358032,-0.4307393281044291,0.0371813935793932,-0.10942961348635118,-0.29162185482891884,-0.033894089121879765,0.1200865484874782,-0.4012876713140561,-0.452613495996053,0.07210281901056924,0.1772676069635054,-0.00972440997539527],
    [0.2275648549759209,0.7039005339452482,-0.261636305132495,-0.5012012873829056,0.1885422304136769,-0.3489018790139085,0.10583974354358486,-0.4816115910815244,0.19614960997482306,-0.4490470692397409,-0.17503970031006086,0.1008425502002274,-0.5401384655751557,0.14995963499728165,0.1507268197617299,-0.2573405282813382,-0.6075293382401856,-0.5010011406746946,0.11023140990423902,0.30581826326901024]
  ];
  
const mockDataLociLabel = ["EQU24_RS00090", "EQU24_RS00265", "EQU24_RS00275", "EQU24_RS00280"];

const getOptions = () => ({
  chart: {
    type: 'line',
    width: 1200,
    height: 800,
    parallelCoordinates: true,
    parallelAxes: {
      lineWidth: 2,
    },
  },
  title: {
    text: 'Parallel Coordinates Chart',
  },
  xAxis: {
    categories: ["LanzaTech","MeOH","NO3_lowO2_slow_growth","NoCu","NoLanthanum","WT_control","WithLanthanum","aa3_KO","crotonic_acid","highCu","highO2_slow_growth","lowCH4","lowCu","lowO2_fast_growth","lowO2_low_iron_fast_growth","lowO2_slow_growth","medCu","slow_growth","uMax","unknown"],
    offset: 10,
  },
  yAxis: [
    {
      type: 'spline',
      min: -1,
      max: 1,
      startOnTick: true
    }
  ],
  series: mockData.map((set, i) => ({
    name: `Loci: ${mockDataLociLabel[i]}`,
    data: set
  })),
  credits: {
    enabled: false,
  }
});

// TODO: IMPLEMENT CONNECTION TO AZURE TO DYNAMICALLY QUERY LOOKUP TABLE 
// const connectionString = "";
// const containerName = "";
// const fileName = "";


function ClusterTabPanel(props) {

    // States
    const [value, setValue] = React.useState(0);
    const [geneTableData, setGeneTableData] = useState([]);
    //const [diffExpressionData, setDiffExpressionData] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    // Context-driven States
    const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
    const {currCluster, setCurrCluster} = useContext(ClusterContext);

    var url_prefix = '';
  
    // selects correct data for the specified [organism, dataset] pair
    switch(String(currOrganismDataset)){  
        default: 
        url_prefix = ''
        break;
        case "0,0":
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_kmeans_ind_cluster_data_json/'
        break;
        case "0,1":
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_birch_ind_cluster_data_json/'
        break;
    }

    console.log(url_prefix);

    //const diff_expression_url = url_prefix + String(currCluster) + "/" + String(currCluster) + "_diff_expression.json";
    const gene_table_url = url_prefix + String(currCluster) + "/" + String(currCluster) + "_gene_table.json"; 

    console.log(gene_table_url);
    

    useEffect(() => {
      // fetch(diff_expression_url)
      // .then(result => result.json())
      // .then(diffExpressionData => setDiffExpressionData(diffExpressionData));

      fetch(gene_table_url)
      .then(result => result.json())
      .then(geneTableData => setGeneTableData(geneTableData));
    }, []);

    console.log(geneTableData); 

    const table_columns = [
      { headerName: "locus_tag", field: "locus_tag", 
          sortable: true, filter: true, pinned: 'left',resizable: true, floatingFilter: true,suppressMovable:true, width: 145},
      { headerName: "gene", field: "gene", 
          sortable: true, filter: true, pinned: 'left',resizable: true, floatingFilter: true,suppressMovable:true, width: 100}, 
      { headerName: "product", field: "product", 
          sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 400, wrapText: true, autoHeight: true},
      { headerName: "start_coord", field: "start_coord", 
          sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "end_coord", field: "end_coord", 
          sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "length", field: "length", 
          sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "group", field: "group", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "uMax", field: "uMax", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "MeOH", field: "MeOH", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NoCu", field: "NoCu", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowCu", field: "lowCu", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "medCu", field: "medCu", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "highCu", field: "highCu", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "LanzaTech", field: "LanzaTech", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowCH4", field: "lowCH4", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "aa3_KO", field: "aa3_KO", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NO3_lowO2_slow_growth", field: "NO3_lowO2_slow_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "highO2_slow_growth", field: "highO2_slow_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_slow_growth", field: "lowO2_slow_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_low_iron_fast_growth", field: "lowO2_low_iron_fast_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "WithLanthanum", field: "WithLanthanum", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NoLanthanum", field: "NoLanthanum", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "crotonic_acid", field: "crotonic_acid", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "slow_growth", field: "slow_growth", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      ];

    // TODO: IMPLEMENT CONNECTION TO AZURE TO DYNAMICALLY QUERY LOOKUP TABLE 
    // Generate lookup table
    // useEffect(() => {
    //   const fetch_data = async() => {
        
    //   } 

    //   fetch_data.catch(console.error);
    // }, []);

  
    return (
      <Box sx={{ width: '100%' }}>
  
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Cluster Data" {...a11yProps(0)} />
            {/* <Tab label="Visualizations" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
  
        <TabPanel value={value} index={0}>
          {/* <h1>Data Table Here!</h1> */}
          <Container className='table-viewer'>
            <div className="ag-theme-alpine"
                    >
                    <AgGridReact  style={{ width: '100%', height: '40%;' }}
                        columnDefs={table_columns}
                        rowData={geneTableData}
                        domLayout='autoHeight'
                        enableCellTextSelection={true}
                    />
            </div>
          </Container>

          <Container className='tabbed-panel'>
              {/* <p>{currCluster}</p> */}
              <HighchartsReact
                containerProps={{ style: { width: '100%', height: '100%' } }}
                options={getOptions()}
                highcharts={Highcharts}
              />
          </Container>
        </TabPanel>
  
      </Box>
    );
}

// ClusterTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default ClusterTabPanel;
