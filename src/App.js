import logo from './logo.svg';
import './App.css';
import { useState, React} from "react";

// Images
import nav_bar_logo from "./Assets/nav_bar_logo.png"

// Material UI Components
import { Button, AppBar, Toolbar, Typography} from '@material-ui/core';

// Global Contexts
//import QuoteContext from "./Contexts/QuoteContext";
import OrganismContext from "./Contexts/OrganismContext";
import ClusterContext from './Contexts/ClusterContext';

// Pages
import Home from './Pages/Home.js';
import ClusterView from './Pages/ClusterView.js'
import DatasetView from './Pages/DatasetView.js'
import GeneView from './Pages/GeneView.js'
import ErrorPage from './Pages/ErrorPage.js'
import Search from './Pages/Search.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
  NavLink, 
  Navigate
} from "react-router-dom";

// Organisms Locally Stored
const organisms = [
  {
    id: 0,
    name: "M. buryatense",
    datasets: ['kMeans','BIRCH']
  }
];

function App() {

  //const [currOrganism, setCurrOrganism] = useState(1);
  const [currOrganismDataset, setCurrOrganismDataset] = useState([0,0]);
  const [currCluster, setCurrCluster] = useState(0)


  return (
      <Router>
        <OrganismContext.Provider value={{ organisms, currOrganismDataset, setCurrOrganismDataset}}>
          <ClusterContext.Provider value={{currCluster, setCurrCluster}}>
            <AppBar position="static" >
              <Toolbar>
                
                <Button color="inherit">
                  <NavLink to="/react-5g-visualization/home" style={{color: 'black', fontSize: 17}}> Home </NavLink>
                </Button>

                <Button color="inherit">
                  <NavLink to="/react-5g-visualization/search" style={{color: 'black', fontSize: 17}}> Search </NavLink>
                </Button>
                <div style={{flex: 1}}></div>
                <img src={nav_bar_logo} alt="logo" style={{ height: 65,}}/>
                
              </Toolbar>
            </AppBar>

            <Routes>
              <Route path="/react-5g-visualization/home" element={<Home/>}/>
              <Route path="/react-5g-visualization/search" element={<Search/>} />
              <Route path="*" element={<Navigate replace to="/error" />} />
              {/* below are data-driven visualization pages */}
              {/* <Route path="/dataset/:dataset_name" element={<DatasetView/>}/> */}
              <Route path="/dataset" element={<DatasetView/>}/>
              <Route path="/cluster" element={<ClusterView/>}/>
              <Route path="/error" element={<ErrorPage/>}/>
              <Route path="/gene/:gene_id" element={<GeneView/>} />
            </Routes>
          </ClusterContext.Provider>
        </OrganismContext.Provider>
        
      </Router>
    );
  }

export default App;
