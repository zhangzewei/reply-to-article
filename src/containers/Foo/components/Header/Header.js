import style from './style.css';
import React, { Component, PropTypes } from 'react';


class Header extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div style={this.props.style} className={style.header}>
        <span className={style.title}>留言板</span>
      </div>
    );
  }
}

export default Header;
