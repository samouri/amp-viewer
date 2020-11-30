import { useRouter } from "next/router";

import { Sizer, CenteringWrapper } from "../utils";

// COLORS
const TOPBAR_COLOR = "rgb(69, 90, 100)";
const HERO_CTA_COLOR = "rgb(96, 125, 139)";

function HomePage() {
  const router = useRouter();
  return (
    <>
      <CenteringWrapper backgroundColor={TOPBAR_COLOR}>
        <div style={{ display: "flex", flexDirection: "row", height: 50 }}>
          <span style={{ fontSize: 32, color: "white", lineHeight: "50px" }}>
            AMP Test Viewer
          </span>
          <Sizer width={32} />
        </div>
      </CenteringWrapper>
      <CenteringWrapper backgroundColor={HERO_CTA_COLOR}>
        <div style={{ height: 540 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 700,
              flexDirection: "column",
              margin: "auto auto",
            }}
          >
            <Sizer height={120} />
            <h1
              style={{
                display: "block",
                fontSize: 45,
                color: "white",
                fontWeight: 300,
                WebkitFontSmoothing: "antialiased",
                margin: "0 auto",
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
                  color: "rgba(0,0,0,0.87)",
                  width: '100%',
                  fontSize: 16,
                  height: 50,
                  padding: "0px 20px",
                  outline: "none",
                  border: "none",
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
                  lineHeight: "40px",
                  textAlign: "center",
                  borderRadius: 5,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  margin: "0px auto",
                  backgroundColor: "#ff9e00",
                  boxShadow:
                    "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
                }}
                value="TEST URL"
              />
            </form>
          </div>
        </div>
      </CenteringWrapper>
    </>
  );
}

export default HomePage;
