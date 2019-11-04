'use strict';
import SocketJS from 'sockjs-client';
import Stomp from 'stompjs';

/**
 * The Websocket client for Spring Messaging.
 *
 * @author Yuqisen
 * @since 2019/11/04
 */
class ForSocket {

  constructor(options) {
    this.options = Object.assign({
      url: '/webSocketEndPoint',
      topic: '/topic',
      user: '/user/'
    }, options);
    this.user = {};
    this.socket = new SocketJS(this.options.url);
    this.stomp = Stomp.over(this.socket);
  }

  /**
   * Send message to server.
   * @param url URL path
   * @param message Message
   */
  send(url, message) {
    if (this.stomp != null) {
      this.stomp.send(url, {}, JSON.stringify(message));
    }
  }

  /**
   * Create the connection for websocket
   * @param topicSubscribeCallback The subscribe Callback for Topic
   * @param userSubscribeCallback The subscribe Callback for self
   * @param errorCallback The Error Callback
   */
  connect(topicSubscribeCallback, userSubscribeCallback, errorCallback) {
    const _self = this;
    this.stomp.connect({}, function (greet) {
      _self.user = greet;
      // Subscribe server message for all of system user.
      _self.stomp.subscribe(_self.options.topic, function (msg) {
        if (topicSubscribeCallback != null) {
          topicSubscribeCallback(JSON.parse(msg));
        }
      });
      // Subscribe server message for user self.
      _self.stomp.subscribe(_self.options.user + _self.user.header['user-name'] + '/**', function (msg) {
        if (userSubscribeCallback != null) {
          userSubscribeCallback(JSON.parse(msg));
        }
      })
    }, function (err) {
      errorCallback(err)
    })
  }

  /**
   * Close the Websocket connection.
   */
  closeConnect() {
    if (this.stomp != null) {
      this.stomp.disconnect();
    }
  }
}

export default ForSocket;
