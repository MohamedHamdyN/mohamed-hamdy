// Prevent flash of unstyled content
;(() => {
  // Check for saved theme preference or use the system preference
  const theme =
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  // Apply the theme class to the html element
  document.documentElement.classList.toggle("dark", theme === "dark")
})()
