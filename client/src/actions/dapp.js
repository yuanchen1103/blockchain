export const SET_STORAGE_VALUE = 'SET_STORAGE_VALUE';

export const setStorageValue = (value) => ({
  type: SET_STORAGE_VALUE,
  value
});

export const SET_WEB3 = 'SET_WEB3';

export const setWeb3 = (value) => ({
  type: SET_WEB3,
  value
});

export const SET_CONTRACT = 'SET_CONTRACT';

export const setContract = (value) => ({
  type: SET_CONTRACT,
  value
});

export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const setAccounts = (value) => ({
  type: SET_ACCOUNTS,
  value
});

export const GET_ALL_ARTS_REQUEST = 'GET_ALL_ARTS_REQUEST';
export const GET_ALL_ARTS_SUCCESS = 'GET_ALL_ARTS_SUCCESS';
export const GET_ALL_ARTS_FAILURE = 'GET_ALL_ARTS_REQUEST';

export const getAllArts = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_ARTS_REQUEST
  });
  const response = await getState().dapp.contract.abiModal.abi.methods.getArts();
  console.log(response);
};

export const ADD_ART_REQUEST = 'ADD_ART_REQUEST';
export const ADD_ART_SUCCESS = 'ADD_ART_SUCCESS';
export const ADD_ART_FAILURE = 'ADD_ART_FAILURE';

// export const addArt = () => (dispatch, getState) => {
//   getState().dapp.contract.abiModal.abi.methods.addArt('')
// }
