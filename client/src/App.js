import React, { Component } from 'react';
import { Provider } from 'react-redux';
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
  state = { loading: true };

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
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    console.log('test');
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });
    console.log(123);
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    console.log(response);
    // Update state with the result.
    store.dispatch(setStorageValue(response));
    this.setState({ storageValue: response });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="App">
          <div className="main-wrapper">
            <div className="header">DAPP GALLERY</div>
            <ExploreContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
