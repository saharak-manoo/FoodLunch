import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setScreenBadge, setDarkMode, setLanguage} from '../actions';

// View
import NavigatorStack from './navigator';

class NavigatorView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigatorStack
        screenProps={Object.assign(
          {},
          this.props.screenBadge,
          this.props.setting,
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
});

const mapDispatchToProps = {
  setScreenBadge,
  setDarkMode,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorView);
