import { Messaging } from './node_modules/@ampproject/viewer-messaging/messaging.js';
import { useCallback } from 'react';

function Viewer({ src, local }) {
  if (typeof window === 'undefined' || !src) {
    return null;
  }
  const origin = window.location.origin;

  const hashParams = {
    history: 1,
    cap: 'a2a,focus-rect,keyboard,swipe',
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
        /* target origin */ origin
      );
      messaging.setDefaultHandler((...args) => handleMessage(iframe, ...args));
    },
    [src]
  );

  let proxyParams = { url: src };
  if (local) {
    proxyParams.local = true;
  }
  const proxySrc = `/api/proxy?${qs(proxyParams)}#${qs(hashParams)}`;
  return (
    <iframe
      style={{ width: '100%' }}
      src={proxySrc}
      ref={establishMessagingChannelFn}
    />
  );
}

function qs(obj) {
  return new URLSearchParams(obj).toString();
}

function handleMessage(iframe, name, data, rsvp) {
  if (name === 'documentHeight') {
    const { height } = data;
    iframe.style.height = height + 'px';
  }
  console.log({ name, data, rsvp, iframe });
}

export default Viewer;
