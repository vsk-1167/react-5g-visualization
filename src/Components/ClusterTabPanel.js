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
    Typography, 
    Card} from "@material-ui/core";
import TabPanel from "./TabPanel";

// Data from Azure
// import { BlobServiceClient } from "@azure/storage-blob";

// Contexts
import OrganismContext from "../Contexts/OrganismContext";
import ClusterContext from "../Contexts/ClusterContext";

// Plotting
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import zIndex from "@material-ui/core/styles/zIndex";
// import { GridApi } from "ag-grid-community";
require("highcharts/modules/exporting")(Highcharts);

// Data
// demo data for chart visualization (switch to hard-code)
// const mockData = [
//     [-0.02149442521388592,0.19515254032875265,-0.13805088044252808,-0.33654635204283445,0.25964156768669344,-0.3142582991448828,0.5702429789982939,-0.4503065575952333,0.13462041448347872,-0.1659451259259506,-0.3120757506810627,-0.08834767068952137,-0.3334111721416201,-0.05525312708567267,-0.14741903084281122,0.22634736595820001,-0.1855340516190431,-0.4429697098113627,0.20680945635675715,-0.09775180128989244],
//     [0.15418868476687447,0.3820712430119415,0.10576651410056684,-0.10700502058066766,0.5692343389321503,0.19081421072363544,0.3891090325680922,0.13549191929911608,-0.00425565277655086,-0.4236660261367464,0.18697094410434406,-0.08374065082984332,-0.3736657575872425,-0.26719336738562405,0.2693142748439727,-0.2982577918741489,-0.4165681010847379,-0.04075736347256706,0.04473644988160445,0.25830339931631097],
//     [0.5841373612031213,-0.19487349691522854,0.060561601901425635,-0.25437194367445226,0.2998571437198797,-0.09237182751903296,0.2799736612598644,0.09196154809360596,0.29987128358032,-0.4307393281044291,0.0371813935793932,-0.10942961348635118,-0.29162185482891884,-0.033894089121879765,0.1200865484874782,-0.4012876713140561,-0.452613495996053,0.07210281901056924,0.1772676069635054,-0.00972440997539527],
//     [0.2275648549759209,0.7039005339452482,-0.261636305132495,-0.5012012873829056,0.1885422304136769,-0.3489018790139085,0.10583974354358486,-0.4816115910815244,0.19614960997482306,-0.4490470692397409,-0.17503970031006086,0.1008425502002274,-0.5401384655751557,0.14995963499728165,0.1507268197617299,-0.2573405282813382,-0.6075293382401856,-0.5010011406746946,0.11023140990423902,0.30581826326901024]
//   ];
  
// const mockDataLociLabel = ["EQU24_RS00090", "EQU24_RS00265", "EQU24_RS00275", "EQU24_RS00280"];

function ClusterTabPanel(props) {

    // States
    const [value, setValue] = React.useState(0);
    const [geneTableData, setGeneTableData] = useState([]);
    const [diffExpressionData, setDiffExpressionData] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    let [lociForActChange, setLociForActChange] = useState([]);
    var lociChange = "";

    // Context-driven States
    const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
    const {currCluster, setCurrCluster} = useContext(ClusterContext);
    const organism_id = currOrganismDataset[0]
    const dataset_id = currOrganismDataset[1]
    const curr_organism_name = organisms[organism_id].name;
    const curr_dataset_name = organisms[organism_id].datasets[dataset_id];

    var url_prefix = '';
  
    // selects correct data for the specified [organism, dataset] pair
    switch(String(currOrganismDataset)){  
        default: 
        url_prefix = ''
        break;
        case "0,0": // organism: M Buryatense, dataset: kmeans
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_kmeans_ind_cluster_data_json/'
        break;
        case "0,1": // organism: M Buryatense, dataset: birch
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_birch_ind_cluster_data_json/'
        break;
    }
    console.log(url_prefix);

    // Add folder location + file name to complete the Azure Blob Storage url 
    const diff_expression_url = url_prefix + String(currCluster) + "/" + String(currCluster) + "_diff_expression.json";
    const gene_table_url = url_prefix + String(currCluster) + "/" + String(currCluster) + "_gene_table.json"; 
    console.log(gene_table_url);

    // On changes to the site's DOM --> changes to the states of the website
    useEffect(() => {
      // Collect the differential expression data from Azure as json
      fetch(diff_expression_url)
      .then(result => result.json())
      .then(diffExpressionData => setDiffExpressionData(diffExpressionData));

      // Collect the gene table summary data from Azure as json
      fetch(gene_table_url)
      .then(result => result.json())
      .then(geneTableData => setGeneTableData(geneTableData));
    }, []);

    // useEffect(() => {
    //   console.log("changing state");
    //   let currentState = activelyClickedLoci.get(lociForActChange);
    //   activelyClickedLoci.set(lociForActChange, !currentState);
    // }, [lociChange]);

    // diffExpressionData.forEach(function(user) {
    //   console.log(user.locus_tag);
    // }); 

    // Trim the differential expression dataset to only metrics for graph
    var keys = [];
    var exludeColList = ["gene", "product", "locus_tag", "cluster_id"]
    for(var k in diffExpressionData[0]){
      if(!exludeColList.includes(k)){
        keys.push(k);
      } 
    }
    console.log(keys);

    // For local reference obtain JSON-encoded information in list format for lookup
    const expValues = diffExpressionData.map(i => Object.values(i).splice(2, keys.length))
    const lociNames = diffExpressionData.map(i => Object.values(i).splice(0, 1)).flat()
    console.log("lociNames");
    console.log(lociNames);

    // Bit-Map of active/inactive loci series (to adjust for selection)
    var activelyClickedLoci = new Map();
    for(let i = 0; i < lociNames.length; i++ ){
      let locusName = "Loci: " + lociNames[i];
      activelyClickedLoci.set(locusName, false)
    }

    // Determine max and min val of adjusted TPM (for plot sizing) 
    const maxExpVal = Math.ceil(Math.max(...[].concat(...expValues)));
    const minExpVal = Math.floor(Math.min(...[].concat(...expValues)));

    // Constants required for mainitaining state of the pCoords plot
    var originalColor;
    var originalZ;
    const pCoordPlotTitle = 'Differential Gene Expression of ' + curr_organism_name + ' Loci in ' + curr_dataset_name + ' Cluster #' + currCluster;
    
    // Outlines the visualization specifics + options for the parallel coordinate plot of diff expression
    const getPCoordsOptions = () => ({
      chart: {
        type: 'line',
        width: 940,
        height: (9 / 16 * 100) + '%',
        parallelCoordinates: true,
        parallelAxes: {
          lineWidth: 2,
        },
        zoomType: 'xy',
        panning: true,
        panKey: 'shift', 
        scrollbar: { enabled: false },
      },
      title: {
        text: pCoordPlotTitle
      },
      xAxis: {
        categories: keys,
        offset: 10,
        gridLineWidth: 1
      },
      yAxis: [
        {
          type: 'spline',
          min: minExpVal,
          max: maxExpVal,
          startOnTick: false
        }
      ],
      series: expValues.map((set, i) => ({
        name: `Loci: ${lociNames[i]}`,
        data: set,
        mouseOver: {
          lineWidth: 2
        },
        stickyTracking: false,
        states:{

        },
        marker: {
          symbol: "circle",
          radius: 3
        },
        events: {
          mouseOver: function() {
            originalColor = this.color;
            originalZ = this.zIndex;
            if(!activelyClickedLoci.get(this.name)){
              console.log("on hover " + this.name)
              console.log("actively clicked on table: " + activelyClickedLoci.get(this.name))
              console.log(zIndex)
              this.update({
                zIndex: 1000,
                lineWidth: 8, 
                shadow:{
                  color: 'black',
                  width: 5000/zIndex.drawer,
                  opacity: 2,
                  offsetX: 1,
                  offsetY: 1,
                },
                marker:{
                  radius: 7, 
                  lineWidth:0
                }
              });
            }
          },
          mouseOut: function() {
            console.log(this.name)
            console.log("actively clicked on table: " + activelyClickedLoci.get(this.name))
            console.log(activelyClickedLoci.get(this.name))
            if(!activelyClickedLoci.get(this.name)){
              console.log("entering here when " + this.name + " is active of " + activelyClickedLoci.get(this.name))
              this.update({
                color: originalColor,
                lineWidth:2, 
                zIndex: originalZ, 
                shadow: false, 
                marker:{
                  radius: 3,
                  lineWidth:0
                }
              });
            }
          },
          click: function () {
            console.log("clicked on " + this.name);
            //GridApi.getRowNode()
          }
        }
      }))
      ,
      credits: {
        enabled: false,
      },
      legend:{ enabled:false },
      exporting: {
        buttons: {
            contextButton: {
                theme: {
                    zIndex: 100   
                }
            }
        }
    }
    });

    // Outlines the column details for the gene data in a given cluster
    const table_columns = [
      { headerName: "locus_tag", field: "locus_tag", 
          sortable: true, filter: true, pinned: 'left',resizable: true, floatingFilter: true,suppressMovable:true, width: 155,
          headerCheckboxSelection: false,
          checkboxSelection: true,
          showDisabledCheckboxes: true,},
      { headerName: "gene", field: "gene", 
          sortable: true, filter: true, pinned: 'left',resizable: true, floatingFilter: true,suppressMovable:true, width: 110}, 
      { headerName: "product", field: "product", 
          sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 400, wrapText: true, autoHeight: true},
      { headerName: "length", field: "length", 
          sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 100},
      { headerName: "start_coord", field: "start_coord", 
          sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 150},
      { headerName: "end_coord", field: "end_coord", 
          sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 150},
      { headerName: "group", field: "group", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "GO Terms", field: "go_terms", 
      //       sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190, wrapText: true,autoHeight: true},
      // { headerName: "translation", field: "translation", 
      //     sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "uMax", field: "uMax", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "MeOH", field: "MeOH", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NoCu", field: "NoCu", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowCu", field: "lowCu", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "medCu", field: "medCu", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "highCu", field: "highCu", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "LanzaTech", field: "LanzaTech", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowCH4", field: "lowCH4", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "aa3_KO", field: "aa3_KO", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NO3_lowO2_slow_growth", field: "NO3_lowO2_slow_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "highO2_slow_growth", field: "highO2_slow_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_slow_growth", field: "lowO2_slow_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "lowO2_low_iron_fast_growth", field: "lowO2_low_iron_fast_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "WithLanthanum", field: "WithLanthanum", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "NoLanthanum", field: "NoLanthanum", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "crotonic_acid", field: "crotonic_acid", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      { headerName: "slow_growth", field: "slow_growth", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      ];
  
    const chartComponentRef = useRef(null); // access the highchart object in DOM between renders
    const rowSelected = (event) => {
        // Add event handlers
        console.log('Cell was clicked')
        console.log(event.data['locus_tag'])
        console.log(event.node.selected) //.data['locus_tag'])

        var selected = event.node.selected
        var selLocusTag = "Loci: " + event.data['locus_tag']

        if(selected){
          try {
            chartComponentRef.current.chart.series.forEach(series => {
              series.data.forEach(axis => {
                if(selLocusTag === axis.series.name ){
                  axis.series.update({
                    lineWidth: 7,
                    zIndex: 1000,
                    shadow:{
                      color: 'black',
                      width: 5,//5000/zIndex.drawer,
                      opacity: .8,
                      offsetX: 0,
                      offsetY: 0,
                    },
                    marker:{
                      radius: 8, 
                      symbol: "square",
                      borderColor: "black",
                      lineColor: "black", 
                      lineWidth: 1
                    },
                    hover: true
                  })
                  console.log(selLocusTag)
                  //lociChange = axis.series.name;
                  //setLociForActChange(axis.series.name);
                  activelyClickedLoci.set(selLocusTag, true)
                } 
              })
            });
          } catch (error) {
            console.log(error)
          }
          
        } else{
          try {
            chartComponentRef.current.chart.series.forEach(series => {
              series.data.forEach(axis => {
                if(selLocusTag === axis.series.name ){
                  axis.series.update({
                    lineWidth: 2, 
                    shadow: false,
                    hover: true,
                    marker:{
                      radius: 3, 
                      symbol: "circle", 
                      lineWidth: 0
                    }
                  })
                  //lociChange = axis.series.name;
                  //setLociForActChange(axis.series.name);
                  activelyClickedLoci.set(axis.series.name, false)
                } 
              })
            });
          } catch (error) {
            console.log(error)
          }
          
        }

        // Set State for the Current Dataset
        //switchCluster(event.data['cluster_id'])

        // Navigate to Cluster Page
        //navigate("/cluster")
    }


    return (
      <Box className='cluster-data' sx={{ width: '100%' }}>
  
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Cluster Data" {...a11yProps(0)} />
            <Tab label="Enrichment Analysis" {...a11yProps(1)} />
          </Tabs>
        </Box>
  
        <TabPanel value={value} index={0}>
          <div align = "left" style={{fontSize: 15, marginTop: 15, marginLeft: 25, marginBottom: -20}}>
                <p>ℹ️ <em>Click on column header in data table below to change sorting of rows 
                  (ascending or descending) based on the column's value</em></p>
          </div>
          <Container className='table-viewer'>
            <div className="ag-theme-alpine"
                    >
                    <AgGridReact  style={{ width: '100%', height: '40%;' }}
                        columnDefs={table_columns}
                        rowData={geneTableData}
                        domLayout='autoHeight'
                        enableCellTextSelection={true}
                        pagination={true}
                        paginationPageSize={5}
                        rowSelection={'multiple'}
                        onRowSelected={event => rowSelected(event)}
                        suppressClickEdit={true}
                        suppressRowClickSelection={true}
                        alwaysShowHorizontalScroll={true}
                    />
            </div>
          </Container>

          <Container className='tabbed-panel'>
              {/* <p>{currCluster}</p> */}
              <HighchartsReact
                containerProps={{ style: { width: '100%', height: '100%' } }}
                options={getPCoordsOptions()}
                highcharts={Highcharts}
                ref={chartComponentRef}
              />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20}}>
              <Container>
                
                <h2>⚠️ FEATURE IN DEVELOPMENT</h2>
                <h4>Gene Ontology Explorer</h4>
                <p>This page will provide an exploration for the GO terms based on 
                    their "Biological Processes (BP)", "Cellular Components (CC)", and "Molecular Functions (MF)"
                    that were enriched in this cluster. Links to the GO Term database will be provided as well.
                </p>
              </Container>
            </Card>
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
