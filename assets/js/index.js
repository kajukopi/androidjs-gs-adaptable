try {
  const sidenav = document.getElementById("sidenav")
  const sidenavInstance = psa.Sidenav.getInstance(sidenav)

  let innerWidth = null

  const setMode = (e) => {
    // Check necessary for Android devices
    if (window.innerWidth === innerWidth) {
      return
    }
    innerWidth = window.innerWidth
    if (window.innerWidth < 660) {
      sidenavInstance.changeMode("over")
      sidenavInstance.hide()
    } else {
      sidenavInstance.changeMode("side")
      sidenavInstance.show()
    }
  }
  setMode()
  // Event listeners
  window.addEventListener("resize", setMode)
} catch (error) {
  console.info("No Sidebar")
}
