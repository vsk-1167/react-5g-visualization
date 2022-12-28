import logo from './logo.svg';
import './App.css';
import { useState, React} from "react";

// Material UI Components
import { Button} from '@material-ui/core';

// Global Contexts
//import QuoteContext from "./Contexts/QuoteContext";
import OrganismContext from "./Contexts/OrganismContext";

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
  Navigate
} from "react-router-dom";

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

function App() {

  //const [currOrganism, setCurrOrganism] = useState(1);
  const [currOrganism, setCurrOrganism] = useState(1);


  return (
      <Router>
        <OrganismContext.Provider value={{ organisms, currOrganism, setCurrOrganism }}>
          <nav>
            <Link to="/"> Home </Link>
            <Link to="/search"> Search </Link>
          </nav>

          
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>} />
            <Route path="*" element={<Navigate replace to="/home" />} />
            {/* below are data-driven visualization pages */}
            {/* <Route path="/dataset/:dataset_name" element={<DatasetView/>}/> */}
            <Route path="/dataset" element={<DatasetView/>}/>
            <Route path="/cluster/:cluster_name" element={<ClusterView/>}/>
            <Route path="/gene/:gene_id" element={<GeneView/>} />
          </Routes>
        </OrganismContext.Provider>
        
      </Router>
    );
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }


export default App;
