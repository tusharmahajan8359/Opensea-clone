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
  uri: "https://api.studio.thegraph.com/query/25712/opensea-collection/0.2.4",
  cache: new InMemoryCache(),
});
//
// import from './Components/NFT/ViewNft.jsx'
export const AppContext = createContext(null);
function App() {
  const [state, setState] = useState({ isConnected: false });
  const [currentAccount, setCurrentAccount] = useState();
  const marketAddress = "0x364Fcde2600Fe7DE53EE2c0b12677E385E5ac6dF";
  const collectionAddress = "0xC0be2c7e674796208E38F1e50DD193B596df5b96";
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
    <ApolloProvider client={client}>
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
            <Explore />
          </Route>

          <Route path="/help-center">
            <HelpDesk />
          </Route>

          <Route path="/create">
            <CreateNewItems />
          </Route>

          <Route path="/profile" exact>
            <MyCollection />
          </Route>

          <Route path="/my-collections/create" exact>
            <CreateCollection />
          </Route>
          <Route path="/explore/nft" exact>
            <ViewNft />
          </Route>

          <Route path="/collection-details/:id" exact>
            <CollectionDetails />
          </Route>
          <Route path="*">
            <Hero />
            <Features />
          </Route>
        </Switch>

        <Footer />
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;
