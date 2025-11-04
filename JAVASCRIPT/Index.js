if (window.location.pathname.includes("Intro.html")) {
  setTimeout(() => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "/HTML/Index.html";
    }, 1000); // wait 1s for fade effect before redirect
  }, 4000); // total 5s
}
