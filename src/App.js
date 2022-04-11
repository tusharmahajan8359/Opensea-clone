import React from 'react';
import './App.css';
import Navbar from './Components/Nav-Bar/NavBar';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Footer from './Components/footer/Footer';
import { Features } from './Components/Features/Features';
import { HelpDesk } from './Components/Nav-Bar/resources/HelpDesk';
import { Explore } from './Components/Nav-Bar/explore/Explore';
import { MyCollection } from './Components/Nav-Bar/profile/MyCollection';
import { CreateNewItems } from './Components/CreateNewItems';
import { CreateCollection } from './Components/Nav-Bar/profile/CreateCollection';
import CollectionDetails from './Components/Nav-Bar/profile/CollectionDetails';
import ViewNft from './Components/NFT/ViewNft';
import { useEffect, useState } from 'react';

//
// import from './Components/NFT/ViewNft.jsx'

function App() {
  const [state, setState] = useState({ isConnected: false });

  return (
    <React.Fragment>
      <Navbar stateData={state} setStateData={setState} />

      <Switch>
        <Route path='/' exact>
          <Hero />
          <Features />
        </Route>

        <Route path='/Explore' exact>
          <Explore />
        </Route>

        <Route path='/Help center'>
          <HelpDesk />
        </Route>

        <Route path='/create'>
          <CreateNewItems />
        </Route>

        <Route path='/my Collections' exact>
          <MyCollection />
        </Route>

        <Route path='/my collections/create' exact>
          <CreateCollection />
        </Route>
        <Route path='/Explore/Nft' exact>
          <ViewNft />
        </Route>

        <Route path='/CollectionDetails' exact>
          <CollectionDetails />
        </Route>
        <Route path='*'>
          <Hero />
          <Features />
        </Route>
      </Switch>

      <Footer />
    </React.Fragment>
  );
}

export default App;
