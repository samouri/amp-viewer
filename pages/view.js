import { useRouter } from "next/router";

import { Sizer, CenteringWrapper, colors } from "../utils";
import Viewer from "../viewer";

function HomePage() {
  const router = useRouter();
  let url = router.query.url;
  if (url && !url.startsWith('https://')) {
    url += 'https://';
  }

  return (
    <>
      <CenteringWrapper backgroundColor={colors.topbar}>
        <div style={{ display: "flex", flexDirection: "column", height: 150 }}>
          <div style={{ display: "flex", height: 50 }}>
            <span style={{ fontSize: 32, color: "white", lineHeight: "50px" }}>
              AMP Test Viewer
            </span>
          </div>
          <Sizer height={16} />
          <div style={{ display: "flex", position: "relative", width: "100%" }}>
            <form
              style={{ width: "100%" }}
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
                  width: "100%",
                  color: "rgba(0,0,0,0.87)",
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
                defaultValue={url != "" ? url : undefined}
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
                  position: "absolute",
                  right: -30,
                  lineHeight: "40px",
                  top: 5,
                  height: 40,
                  width: 100,
                  textAlign: "center",
                  cursor: "pointer",
                  margin: "0px auto",
                  backgroundColor: "#ff9e00",
                  border: "none",
                  boxShadow:
                    "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
                }}
                value="GO"
              />
            </form>
          </div>
        </div>
      </CenteringWrapper>
      <CenteringWrapper>
        {/* TODO: use actual viewer and listen to documentHeight changes. */}
        <Viewer src={url} />
      </CenteringWrapper>
    </>
  );
}

export default HomePage;
