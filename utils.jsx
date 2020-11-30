function Sizer({ height, width }) {
  return <div style={{ width, height }} />;
}

function CenteringWrapper({
  children,
  backgroundColor = "white",
  gutterWidth = 50,
}) {
  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor,
            zIndex: -1,
          }}
        />
        <div
          style={{
            width: `calc(100vw - ${gutterWidth * 2}px)`,
            alignItems: "center",
            maxWidth: 1024,
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export { Sizer, CenteringWrapper };
