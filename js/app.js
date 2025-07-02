console.log("hallo")
// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")

hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active")
navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
})
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
    target.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
    }
})
})

// Scroll animations
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.classList.add("visible")
    }
})
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
observer.observe(el)
})

// Header background on scroll
window.addEventListener("scroll", () => {
const header = document.querySelector("header")
if (window.scrollY > 200) {
    
    header.style.background = "#FAFAFA"
} else {
    header.style.background = "none"
}
})


// Counter animation for stats
function animateCounter(element, target) {
let current = 0
const increment = target / 100
const timer = setInterval(() => {
    current += increment
    if (current >= target) {
    current = target
    clearInterval(timer)
    }

    if (target >= 1000000) {
    element.textContent = "$" + (current / 1000000).toFixed(1) + "M+"
    } else if (target >= 1000) {
    element.textContent = (current / 1000).toFixed(0) + "K+"
    } else {
    element.textContent = Math.floor(current) + "+"
    }
}, 20)
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
(entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat, index) => {
        const targets = [10000000, 50, 100000] // $10M+, 50+, 100K+
        setTimeout(() => {
            animateCounter(stat, targets[index])
        }, index * 200)
        })
        statsObserver.unobserve(entry.target)
    }
    })
},
{ threshold: 0.5 },
)

const statsSection = document.querySelector(".stats-section")
if (statsSection) {
statsObserver.observe(statsSection)
}

// Add hover effects to cards
document.querySelectorAll(".innovation-card, .stat-item").forEach((card) => {
card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
})

card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
})
})

// Dynamic gradient animation
function animateGradients() {
const gradientElements = document.querySelectorAll(".card-image, .tech-image, .space-image")

gradientElements.forEach((element, index) => {
    const hue = (Date.now() / 50 + index * 60) % 360
    const saturation = 70 + Math.sin(Date.now() / 1000 + index) * 20
    const lightness = 50 + Math.cos(Date.now() / 1500 + index) * 10

    element.style.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${lightness}%)`
})



function animateCounterTwice(countEl, target) {
    const duration = 1000; // tiap animasi 1 detik
    const frameRate = 60;
    const steps = Math.round((duration / 1000) * frameRate);
    const increment = target / steps;

    let current = 0;
    let count = 0;
    let loop = 0;

    const interval = setInterval(() => {
      current += increment;
      count++;

      if (current >= target || count >= steps) {
        loop++;
        if (loop < 2) {
          // ulang dari 0 lagi
          current = 0;
          count = 0;
        } else {
          // berhenti di target
          current = target;
          clearInterval(interval);
        }
      }

      countEl.textContent = Math.floor(current);
    }, 1000 / frameRate);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target.querySelector(".stat-number");
          const countEl = stat.querySelector(".num-count");
          const target = parseInt(stat.dataset.target, 10);
          animateCounterTwice(countEl, target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }




requestAnimationFrame(animateGradients)
}

// Start gradient animation
animateGradients()
