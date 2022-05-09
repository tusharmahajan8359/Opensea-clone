import React from "react";
import "./App.css";
import Navbar from "./Components/Nav-Bar/NavBar";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/footer/Footer";
import { Features } from "./Components/Features/Features";
import { HelpDesk } from "./Components/Nav-Bar/resources/HelpDesk";
import { Explore } from "./Components/Nav-Bar/explore/Explore";
import { MyCollection } from "./Components/Nav-Bar/profile/MyCollection";
import { CreateNewItems } from "./Components/CreateNewItems";
import { CreateCollection } from "./Components/Nav-Bar/profile/CreateCollection";
import CollectionDetails from "./Components/Nav-Bar/profile/CollectionDetails";
import ViewNft from "./Components/NFT/ViewNft";
import { useEffect, useState, createContext } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/25712/opensea-collection/0.2.5",
  cache: new InMemoryCache(),
});
const marketClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/25712/opensea-marketplace/0.1.6",
  cache: new InMemoryCache(),
});

// import from './Components/NFT/ViewNft.jsx'
export const AppContext = createContext(null);
function App() {
  const [state, setState] = useState({ isConnected: false });
  const [currentAccount, setCurrentAccount] = useState();
  const marketAddress = "0x4D17d434e12035988E7B78e457Be62549085E767";
  const collectionAddress = "0xe9eb35c2D076BCf3696CbF1408f6Db73f31CFcb3";
  async function connectWallet() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account);
  }

  useEffect(() => connectWallet());

  window.ethereum.on("accountsChanged", function (accounts) {
    connectWallet();
  });

  return (
    <React.Fragment>
      <AppContext.Provider
        value={{ currentAccount, marketAddress, collectionAddress }}
      >
        <Navbar stateData={state} setStateData={setState} />

        <Switch>
          <Route path="/" exact>
            <Hero />
            <Features />
          </Route>

          <Route path="/explore" exact>
            <ApolloProvider client={client}>
              <Explore />
            </ApolloProvider>
          </Route>

          <Route path="/help-center">
            <HelpDesk />
          </Route>

          <Route path="/create">
            <CreateNewItems />
          </Route>

          <Route path="/profile" exact>
            <ApolloProvider client={client}>
              <MyCollection />
            </ApolloProvider>
          </Route>

          <Route path="/my-collections/create" exact>
            <CreateCollection />
          </Route>
          <Route path="/explore/nft" exact>
            <ApolloProvider client={marketClient}>
              <ViewNft />
            </ApolloProvider>
          </Route>

          <Route path="/collection-details/:id" exact>
            <ApolloProvider client={client}>
              <CollectionDetails />
            </ApolloProvider>
          </Route>
          <Route path="*">
            <Hero />
            <Features />
          </Route>
        </Switch>

        <Footer />
      </AppContext.Provider>
    </React.Fragment>
  );
}

export default App;
