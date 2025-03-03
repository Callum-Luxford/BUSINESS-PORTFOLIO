// Left container scroll into class
document.addEventListener("scroll", function () {
  const leftContainer = document.getElementById("left-container");
  if (window.scrollY > 50) {
    // Adjust this threshold as needed
    leftContainer.classList.add("scrolled");
  } else {
    leftContainer.classList.remove("scrolled");
  }
});



// Scroll acctive effect for sections when in the viewport
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let activeLink = null; // Track the currently active link

  function setActive(link) {
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
    activeLink = link; // Update active tracking
  }

  // Set HOME as active by default on page load
  const homeLink = document.querySelector('.nav-link[data-section="home"]');
  if (homeLink) {
    setActive(homeLink);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (document.querySelector(".nav-link:hover")) return; // Skip if hovering

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedLink = document.querySelector(
            `.nav-link[data-section="${entry.target.id}"]`
          );
          if (matchedLink) {
            setActive(matchedLink);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe all sections
  sections.forEach((section) => observer.observe(section));

  // Remove active state when hovering over a nav link
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (activeLink) activeLink.classList.remove("active"); // Remove active when hovering
    });

    link.addEventListener("mouseleave", () => {
      if (activeLink) activeLink.classList.add("active"); // Restore last active link
    });
  });
});

