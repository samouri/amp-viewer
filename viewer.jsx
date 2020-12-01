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
      if (!iframe || !src) {
        return;
      }
      const messaging = await Messaging.waitForHandshakeFromDocument(
        /* source window */ window,
        /* target window */ iframe.contentWindow,
        /* target origin */ new URL(src).origin
      );
      messaging.setDefaultHandler((...args) => handleMessage(iframe, ...args));
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
  if (name === 'documentHeight') {
    const { height } = data;
    iframe.style.height = height + 'px';
  }
  console.log({ name, data, rsvp, iframe });
}

export default Viewer;
