# forsocket-client [![NPM version](https://img.shields.io/npm/v/forsocket-client.svg)](https://www.npmjs.com/package/forsocket-client)
The websocket client base on socketjs and stomp.

## Installation
You can either install this package with `npm`, or manually by downloading the primary plugin file.

## Usage
Register the plugin. By default, it will connect to `/`:

```js
import ForSocketClient from 'forsocket-client';
Vue.use(ForSocketClient);
```

Or to connect to another address:

```js
Vue.use(ForSocketClient, {
  url: "ws://otherserver:8080", // Spring SocketJS Endpoint.
  topic: '/topic',              // The subscribe path for all of system user.
  user: '/user/'                // The subscribe path for myself.
});
```

To use it in your components:

```html
<script>
  export default {
    mounted () {
      this.$forsocket.connect(
        topic => {
          // TODO All user message received. 
        }, user => {
          // TODO myself message received.
        }, error => {
          // TODO Connection error!
        });
    },
    methods: {
      sendSocketMessage() {
        // Send Message to server.
        this.$forsocket.send('/app/xxx', JSON.stringify(msg));
      }
    }
  };
</script>
```

## License
`forsocket-client` is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact
Copyright © 2019 Yuqisen

[![@Yuqisen](https://img.shields.io/badge/github-Yuqisen-green.svg)](https://github.com/Yuqisen)
