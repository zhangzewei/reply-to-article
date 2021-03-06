import * as at from 'constants/actionTypes';
import PouchDB from 'pouchdb';

const replydb = new PouchDB('http://localhost:5984/reply');

export function changeName(name) {
  return {
    type: at.CHANGE_NAME,
    name,
  };
}

export function changeMessage(message) {
  return {
    type: at.CHANGE_MESSAGE,
    message,
  };
}

export function randomName(num) {
  return (dispatch) => (
    fetch('/api/name/random', {
      method: 'post',
      body: JSON.stringify({
        num,
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(changeName(json.name)))
  );
}

export function addReply(reply, replys) {
  if (reply) {
    replydb.put({
      _id: new Date().toISOString(),
      email: reply.email,
      reply: reply.reply,
      replyTo: reply.replyTo,
    }).then(() => {
      console.log('update success');
    }).catch((err) => {
      console.log(err);
    });
    replys.push(reply);
  }
  console.log(replys);
  return {
    type: at.ADD_REPLYS,
    replys,
  };
}

export function getReplyFromDB() {
  return (dispatch) => replydb.allDocs({
    include_docs: true,
    attachments: true,
  }).then((result) => {
    // handle result
    const replys = [];
    for (let i = 0; i < result.rows.length; i++) {
      replys.push(result.rows[i].doc);
    }
    dispatch(addReply('', replys));
  }).catch((err) => {
    console.log(err);
  });
}
