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
//import {AboutTabs} from "../Components/TabPanel"
import SearchSplitPane, {
    SearchSplitPaneTop,
    SearchSplitPaneBottom
  } from "../Components/SearchSplitPane"; 
import SearchTabPanel from '../Components/SearchTabPanel';


// Function --> 
function Search() {

    const gridstyle = {
      width: '100vw',
      height: '100vh',
      spacing: 0,
      justify: 'space-around'
    }

    return (
      <div className="App">
        <Grid container spacing ={1} columns={2} style= {gridstyle}>
          <Grid item xs={6} md ={4}>
            {/* LEFT PANEL*/}
            <SearchSplitPane className="split-pane-col">
              <SearchSplitPaneTop/>
              <SearchSplitPaneBottom />
            </SearchSplitPane>
          </Grid>

          <Grid item xs={6} md={8} >
            {/*RIGHT PANEL*/}
            <Container className='tabbed-panel'>
              <SearchTabPanel/>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
    }

export default Search;
  