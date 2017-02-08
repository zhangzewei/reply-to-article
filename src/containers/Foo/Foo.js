import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FooActions from 'containers/Foo/actions';
import Header from './components/Header';
import Replys from './components/Replys';


function mapStateToProps(state) {
  const { foo } = state;
  return { foo };
}

function mapDispatchToProps(dispatch) {
  return {
    fooActions: bindActionCreators(FooActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Foo extends Component {
  static propTypes = {
    foo: PropTypes.object.isRequired,
    fooActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    foo: PropTypes.object,
    fooActions: PropTypes.object,
  };

  getChildContext() {
    const { foo, fooActions } = this.props;
    return { foo, fooActions };
  }

  render() {
    console.log(this.props.foo);
    const { replys } = this.props.foo.toJS();
    console.log(replys);
    return (
      <div className={style.content}>
        <Header />
        <div className={style.main} >
          <Replys replys={replys} />
        </div>
      </div>
    );
  }
}

export default Foo;
