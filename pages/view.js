import { useRouter } from 'next/router';
import Image from 'next/image';

import { Sizer, CenteringWrapper, colors } from '../utils';
import Viewer from '../viewer';

function HomePage() {
  const router = useRouter();
  const height = router.query.height ? Number(router.query.height) : 0;
  const local = !!router.query.local;
  let url = router.query.url;
  if (url) {
    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://');
    } else if (!url.startsWith('https://')) {
      url = 'https://' + url;
    }
  }

  return (
    <>
      <CenteringWrapper backgroundColor={colors.topbar}>
        <div style={{ display: 'flex', flexDirection: 'column', height: 150 }}>
          <div style={{ display: 'flex', height: 50, alignItems: 'baseline' }}>
            <span style={{ fontSize: 32, color: 'white', lineHeight: '50px' }}>
              AMP Test Viewer
            </span>
            <Sizer width={32} />
            <span style={{ fontSize: 18, lineHeight: '50px', color: 'white' }}>
              Local:
              <input
                type="checkbox"
                style={{ fontSize: 18, cursor: 'pointer' }}
                defaultChecked={local}
                onClick={() => {
                  const queryParams = new URLSearchParams(location.search);
                  if (local) {
                    queryParams.delete('local');
                  } else {
                    queryParams.set('local', true);
                  }
                  window.location.search = queryParams.toString();
                }}
              />
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
          <Sizer height={16} />
          <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
            <form
              style={{ width: '100%' }}
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
                  width: '100%',
                  color: 'rgba(0,0,0,0.87)',
                  fontSize: 16,
                  height: 50,
                  padding: '0px 20px',
                  outline: 'none',
                  border: 'none',
                }}
                autoComplete="off"
                tabIndex="0"
                placeholder="Enter a URL to test"
                defaultValue={url != '' ? url : undefined}
                aria-label="Enter a URL to test"
                autoFocus
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />

              <input
                type="submit"
                role="button"
                style={{
                  fontSize: 18,
                  position: 'absolute',
                  right: -30,
                  lineHeight: '40px',
                  top: 5,
                  height: 40,
                  width: 100,
                  textAlign: 'center',
                  cursor: 'pointer',
                  margin: '0px auto',
                  backgroundColor: '#ff9e00',
                  border: 'none',
                  boxShadow:
                    '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
                }}
                value="GO"
              />
            </form>
          </div>
        </div>
      </CenteringWrapper>
      <CenteringWrapper>
        <Viewer src={url} local={local} height={height}/>
      </CenteringWrapper>
    </>
  );
}

export default HomePage;
