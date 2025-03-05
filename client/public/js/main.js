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
  let activeLink = null; // Track the currently active link before hovering

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
    { threshold: 0.7 } // Now requires 70% of the section to be visible
  );

  // Observe all sections
  sections.forEach((section) => observer.observe(section));

  // Hover effect: remove active, but restore the last active when hovering stops
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      navLinks.forEach((nav) => nav.classList.remove("active")); // Remove all active classes
      link.classList.add("hovered"); // Add temporary hovered effect
    });

    link.addEventListener("mouseleave", () => {
      navLinks.forEach((nav) => nav.classList.remove("hovered")); // Remove hover effect
      if (activeLink) activeLink.classList.add("active"); // Restore last active link
    });

    // Click event: smooth scroll and set active manually
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("data-section");
      const section = document.getElementById(sectionId);

      if (section) {
        window.scrollTo({
          top: section.offsetTop - 50, // Adjust for fixed nav height
          behavior: "smooth",
        });

        setActive(link); // Manually set active class on click
      }
    });
  });
});

// Add and remove active class for inputs form
document.querySelectorAll(".info-box").forEach((box) => {
  box.addEventListener("mousedown", function (event) {
    // Remove active class from all boxes
    document.querySelectorAll(".info-box").forEach((el) => {
      el.classList.remove("active");
    });

    // Add active class to the clicked one
    this.classList.add("active");

    // Remove active class after a short delay to simulate click effect
    setTimeout(() => {
      this.classList.remove("active");
    }, 300); // Adjust timing if necessary

    // Stop event propagation to prevent immediate removal
    event.stopPropagation();
  });
});

// Ensure clicking outside removes the active state immediately
document.addEventListener("click", function (event) {
  if (!event.target.closest(".info-box")) {
    document.querySelectorAll(".info-box").forEach((box) => {
      box.classList.remove("active");
    });
  }
});

// Skills percentage and progress bar animation
document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector(".skills-section");
  const progressBars = document.querySelectorAll(".progress");
  const percentages = document.querySelectorAll(".skill-percent");
  let skillsAnimationPlayed = false;

  function resetSkills() {
    progressBars.forEach((bar, index) => {
      bar.style.width = "0%";
      percentages[index].textContent = "0%";
    });
    skillsAnimationPlayed = false;
  }

  function animateSkills() {
    if (skillsAnimationPlayed) return;

    progressBars.forEach((bar, index) => {
      const percent = bar.getAttribute("data-percent");
      bar.style.width = percent + "%";

      let count = 0;
      const target = parseInt(percent);
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          percentages[index].textContent = count + "%";
        } else {
          clearInterval(interval);
        }
      }, 15);
    });

    skillsAnimationPlayed = true;
  }

  function checkSkillsScroll() {
    const screenHeight = window.innerHeight;
    const skillsPosition = skillsSection.getBoundingClientRect();

    if (skillsPosition.top < screenHeight * 0.8 && skillsPosition.bottom > 0) {
      animateSkills();
    } else if (
      skillsPosition.bottom <= 0 ||
      skillsPosition.top >= screenHeight
    ) {
      resetSkills();
    }
  }

  // Trigger check on page load + listen for scroll events
  checkSkillsScroll();
  window.addEventListener("scroll", checkSkillsScroll);
});

// Home numbers count up animation
document.addEventListener("DOMContentLoaded", function () {
  const statNumbers = document.querySelectorAll(".stat-box .number");
  let animationPlayed = false; // Track if animation has played

  function resetStats() {
    statNumbers.forEach((stat) => {
      stat.textContent = "0+";
      stat.dataset.animated = "false"; // Allow re-trigger
    });
    animationPlayed = false;
  }

  function animateStats() {
    if (animationPlayed) return; // Prevent re-triggering

    statNumbers.forEach((stat) => {
      let count = 0;
      const target = parseInt(stat.getAttribute("data-home-number"));
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          stat.textContent = count + "+";
        } else {
          clearInterval(interval);
        }
      }, 50);
    });

    animationPlayed = true;
  }

  function checkStatsVisibility() {
    let allVisible = true;

    statNumbers.forEach((stat) => {
      const rect = stat.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      // Ensure each number is at least 50% visible before triggering
      if (!(rect.top < screenHeight * 0.95 && rect.bottom > 0)) {
        allVisible = false;
      }
    });

    if (allVisible) {
      animateStats();
    } else {
      resetStats();
    }
  }

  // Trigger check on page load + listen for scroll events
  checkStatsVisibility();
  window.addEventListener("scroll", checkStatsVisibility);
});
