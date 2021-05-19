import React, { Component } from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          content: 'how are you?',
          self: false,
        },
        {
          content: 'fine dude!!😎 Wau?',
          self: true,
        },
        {
          content: 'I am not so good!!😫😥',
          self: false,
        },
      ], // {content: 'some message', self: true}
      typedMessage: '',
    };

    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnection();
    }
  }
  scrollbar = () => {
    $('#messages').scrollTop($('#messages').height());
  };

  setupConnection = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('Connection Established!');
      socketConnection.emit('join_room', {
        //for establishing a connextion between the user and the chat server
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on(
        'user_joined',
        function (
          data //server sends a message that user has joined
        ) {
          console.log('New user Joined!', data);
        }
      );
    });

    this.socket.on('receive_message', function (data) {
      //add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      } else {
        messageObject.self = false;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSendMsg = (event) => {
    event.preventDefault();
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
    this.setState({ typedMessage: '' });
  };
  handleOpenChat = (e) => {
    this.scrollbar();
    this.open();
  };
  open = () => {
    $('.top-btn').addClass('top-btn-show');
    $('.contact-form-page').addClass('show-profile');
    $('.buttom-btn').addClass('buttom-btn-hide');
  };

  handleCloseChat = () => {
    this.close();
  };
  close = () => {
    $('.buttom-btn').removeClass('buttom-btn-hide');
    $('.contact-form-page').removeClass('show-profile');
  };
  render() {
    const { typedMessage, messages } = this.state;
    // console.log('sasa', messages);
    return (
      <div className="chat">
        <div className="container">
          <div className="row">
            <div className="wrapper">
              <div className="contact-form-page">
                <div className="bg-img"></div>
                <div className="form-head">
                  <h1>
                    Chat&nbsp;<i className="fa fa-comment"></i>
                  </h1>
                  <Link
                    className="top-btn"
                    to="#"
                    onClick={this.handleCloseChat}
                  >
                    <i className="fa fa-times"></i>
                  </Link>
                </div>
                <div className="message" id="messages">
                  <div className="sentmsgs">
                    Hellosaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </div>
                  <div className="receivedmsgs">Heyyyy</div>
                  <div className="sentmsgs">Hello</div>
                  <div className="receivedmsgs">Heyyyy</div>
                  {messages.map((message, index) => (
                    <div
                      className={message.self ? 'sentmsgs' : 'receivedmsgs'}
                      key={index}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <div className="input">
                    <div className="ms-1 input-group">
                      <input
                        style={{
                          zIndex: '0',
                          background: '#f2f3f4',
                          borderRadius: '5px',
                        }}
                        type="text"
                        className="me-1 form-control"
                        placeholder="Write a message.."
                        onChange={(e) =>
                          this.setState({ typedMessage: e.target.value })
                        }
                        value={typedMessage}
                      />
                      <span className="input-group-btn ">
                        <button
                          style={{ fontSize: '18px' }}
                          className="me-2 btn btn-secondary rounded-corner"
                          type="button"
                          onClick={this.handleSendMsg}
                          // disabled={addComment}
                        >
                          Send
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="buttom-btn" to="#" onClick={this.handleOpenChat}>
                <i className="fa fa-comment"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chatbox);
