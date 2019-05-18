import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExploreContainer from './components/Explore/ExploreContainer';
import Arts from './contracts/Arts.json';
import getWeb3 from './utils/getWeb3';
import store from './configureStore';
import {
  setStorageValue,
  setWeb3,
  setAccounts,
  setContract
} from './actions/dapp';
import './assets/styles/index.scss';

class App extends Component {
  state = { loading: true, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Arts.networks[networkId];
      const instance = new web3.eth.Contract(
        Arts.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      store.dispatch(setWeb3(web3));
      store.dispatch(setAccounts(accounts));
      store.dispatch(setContract(instance));
      this.setState({ web3, accounts, contract: instance }, () => {
        this.runExample();
      })
      this.getAllArts()
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  getAllArts = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getArts.call();
    console.log(response);
  }

  runExample = async () => {
    console.log('test');
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    // Update state with the result.
    store.dispatch(setStorageValue(response));
    this.setState({ storageValue: response });
  };

  render() {
    const { contract, loading } = this.state;
    if (loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
          <div className="main-wrapper">
            <div className="header">DAPP GALLERY</div>
            <Route exact path="/" component={() => <ExploreContainer contract={contract}/>}/>
          </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
