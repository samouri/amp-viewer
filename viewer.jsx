import { Messaging } from './node_modules/@ampproject/viewer-messaging/messaging.js';
import { useCallback } from 'react';

function Viewer({ src }) {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = {
    history: 1,
    cap: 'a2a,focus-rect,keyboard,swipe,iframeScroll',
    origin: window.location.origin,
  };

  const establishMessagingChannelFn = useCallback(
    async (iframe) => {
      if (!iframe) {
        return;
      }
      const messaging = await Messaging.waitForHandshakeFromDocument(
        /* source window */ window,
        /* target window */ iframe.contentWindow,
        /* target origin */ src
      );
      console.log('hangs before this part', messaging);
      messaging.setDefaultHandle((...args) => handleMessage(iframe, ...args));
    },
    [src]
  );

  return (
    <iframe
      style={{ width: '100%' }}
      src={`${src}#${new URLSearchParams(params).toString()}`}
      ref={establishMessagingChannelFn}
    />
  );
}

function handleMessage(iframe, name, data, rsvp) {
  console.log({ name, data, rsvp, iframe });
}

export default Viewer;
