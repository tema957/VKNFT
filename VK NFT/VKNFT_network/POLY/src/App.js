import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import NFTList from './NFTList';
import NFTDetails from './NFTDetails';
import NFTMarketplace from './NFTMarketplace';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import NFTList from './NFTList';
import NFTDetails from './NFTDetails';
import NFTMarketplace from './NFTMarketplace';

function App() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/nft-list" component={NFTList} />
            <Route exact path="/nft-details/:id" component={NFTDetails} />
            <Route exact path="/nft-marketplace" component={NFTMarketplace} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
  
  export default App;