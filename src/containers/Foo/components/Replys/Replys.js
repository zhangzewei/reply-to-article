import style from './style.css';
import { Modal, Row, Col } from 'antd';
import React, { Component, PropTypes } from 'react';
import ReplyContent from '../replyArticle';
import md5 from 'js-md5';

class Reply extends Component {
  static propTypes = {
    replys: PropTypes.array.isRequired,
  };

  static contextTypes = {
    fooActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      replys: this.props.replys,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
    this.context.fooActions.getReplyFromDB();
  }

  showModal(replyTo1) {
    document.getElementById('replyTo').innerHTML = replyTo1.toString();
    this.setState({
      visible: true,
    });
    console.log(this.state);
  }

  handleCancel() {
    document.getElementById('replyTo').innerHTML = '';
    this.setState({
      visible: false,
    });
  }

  render() {
    const replys = this.props.replys.map((reply, index) => (
      <div className={style.reply} key={index}>
        <img src={`https://www.gravatar.com/avatar/${md5(reply.email.trim())}`} alt="头像" />
        <p>
          {reply.replyTo ? `${reply.email} 回复给 ${reply.replyTo}` : `${reply.email}`}
          <br />
          {reply.reply}
        </p>
        <span className={style.floor}>楼层 {index + 1}</span>
        <span
          onClick={() => {
            this.showModal(reply.email);
          }}
        >回复 {reply.email}</span>
      </div>
    ));
    return (
      <div className={style.message}>
        <span id="replyTo" hidden="hidden" ></span>
        <Row type="flex" justify="center" align="middle">
          <Col span={18}>
            <div className={style.article}>
              <h2>读句电影再睡觉</h2>
              <p>
                很多人可能看过法国的《两小无猜》，但是不知道1971年英国的《两小无猜》。故事说
                的是两个小学生的初恋故事，影片最有意思的地方是叛逆的孩子们为两人举行的婚礼。
                影片使用的配乐都来自Bee Gees组合，他们在2014年被授予格莱美终身成就奖。音乐
                非常棒，推荐一听。晚安
              </p>
              {replys}
            </div>
          </Col>
          <Col span={18}>
            <ReplyContent replys={this.props.replys} />
          </Col>
        </Row>
        <Modal
          title={'回复'}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
          maskClosable
        >
          <ReplyContent replys={this.props.replys} />
        </Modal>
      </div>
    );
  }
}

export default Reply;
