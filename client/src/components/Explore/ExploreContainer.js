import { connect } from 'react-redux';
import Explore from './Explore';
import { getAllArts } from '../../actions/dapp';

const mapStateToProps = (state, props) => {
  return {
    ...props
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllArts: () => {
      dispatch(getAllArts())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
