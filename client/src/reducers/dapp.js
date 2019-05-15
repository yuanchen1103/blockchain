import {
  SET_STORAGE_VALUE,
  SET_ACCOUNTS,
  SET_CONTRACT,
  SET_WEB3
} from '../actions/dapp';

const initialState = {
  isFetching: true,
  web3: null,
  storageValue: 0,
  contract: null,
  accounts: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STORAGE_VALUE:
      return {
        ...state,
        storageValue: action.value
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.value
      };
    case SET_CONTRACT:
      return {
        ...state,
        contract: action.value
      };
    case SET_WEB3:
      return {
        ...state,
        web3: action.value
      };
    default:
      return state;
  }
};
