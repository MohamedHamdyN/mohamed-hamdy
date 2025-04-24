export default function RootNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "6rem", margin: "0" }}>404</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Page Not Found</p>
        <a
          href="/"
          style={{
            backgroundColor: "#3B82F6",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
