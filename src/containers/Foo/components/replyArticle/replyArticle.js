import style from './style.css';
import { Button, Input } from 'antd';
import React, { Component, PropTypes } from 'react';


class replyArticle extends Component {
  static propTypes = {
    replys: PropTypes.array.isRequired,
  };

  static contextTypes = {
    fooActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      reply: '',
      replyTo: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    this.setState(
      {
        email: e.target.value,
        replyTo: document.getElementById('replyTo').innerHTML,
      }
    );
  }

  handleReply(e) {
    this.setState(
      { reply: e.target.value }
    );
  }

  handleSubmit() {
    const email = this.state.email.trim();
    const reply = this.state.reply.trim();
    if (email === '' || reply === '') {
      alert('请填写完整再提交');
      return false;
    }
    this.context.fooActions.addReply(this.state, this.props.replys);
    const inputs = document.getElementsByClassName('ant-input');
    for (let i = 0; i < inputs.length; i ++) {
      inputs[i].value = '';
    }
    this.setState(
      {
        email: '',
        reply: '',
        replyTo: '',
      }
    );
    return true;
  }

  render() {
    return (
      <div>
        <Input
          className={style.input}
          onChange={this.handleEmail}
          placeholder="请输入您的邮箱"
          type="email"
        />
        <Input
          className={style.input}
          onChange={this.handleReply}
          rows={8}
          placeholder="请输入您留言"
          type="textarea"
        />
        <Button onClick={this.handleSubmit} >提交</Button>
      </div>
    );
  }
}

export default replyArticle;
