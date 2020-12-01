import { useRouter } from 'next/router';
import Image from 'next/image';

import { Sizer, CenteringWrapper, colors } from '../utils';

// COLORS

function HomePage() {
  const router = useRouter();
  return (
    <>
      <CenteringWrapper backgroundColor={colors.topbar}>
        <div style={{ display: 'flex', flexDirection: 'row', height: 50 }}>
          <span style={{ fontSize: 32, color: 'white', lineHeight: '50px' }}>
            AMP Test Viewer
          </span>
          <a
            href="https://github.com/samouri/amp-viewer"
            style={{
              marginLeft: 'auto',
              height: 32,
              position: 'relative',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Image src="/gh.png" height={32} width={32} />
          </a>
        </div>
      </CenteringWrapper>
      <CenteringWrapper backgroundColor={colors.hero}>
        <div style={{ height: 540 }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 700,
              flexDirection: 'column',
              margin: 'auto auto',
            }}
          >
            <Sizer height={120} />
            <h1
              style={{
                display: 'block',
                fontSize: 45,
                color: 'white',
                fontWeight: 300,
                WebkitFontSmoothing: 'antialiased',
                margin: '0 auto',
              }}
            >
              Test out your AMP Page in a Viewer
            </h1>
            <Sizer height={32} />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const urlInput = e.target.elements.url_input;
                const url = urlInput.value;
                router.push(`/view?url=${encodeURIComponent(url)}`);
              }}
            >
              <input
                id="url_input"
                style={{
                  color: 'rgba(0,0,0,0.87)',
                  width: '100%',
                  fontSize: 16,
                  height: 50,
                  padding: '0px 20px',
                  outline: 'none',
                  border: 'none',
                }}
                type="url"
                autoComplete="off"
                tabIndex="0"
                placeholder="Enter a URL to test"
                aria-label="Enter a URL to test"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                autoFocus
              />
              <Sizer height={18} />
              <input
                type="submit"
                role="button"
                style={{
                  display: 'block',
                  width: 120,
                  height: 40,
                  lineHeight: '40px',
                  textAlign: 'center',
                  borderRadius: 5,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  margin: '0px auto',
                  backgroundColor: '#ff9e00',
                  boxShadow:
                    '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
                }}
                value="TEST URL"
              />
            </form>
            <Sizer height={32} />
            <p style={{ color: 'white' }}>
              Note: AMP Documents must include the script for{' '}
              <a href="https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration/0.1/messaging">
                amp-viewer-integration
              </a>
            </p>
          </div>
        </div>
      </CenteringWrapper>
    </>
  );
}

export default HomePage;
