document.addEventListener("DOMContentLoaded", () => {
    const timeElement = document.querySelector(".time");
    const dateElement = document.querySelector(".date");
  
    // Guard clause to avoid errors if elements don't exist on the page
    if (!timeElement || !dateElement) return;
  
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  
    function updateTimeAndDate() {
      const now = new Date();
      timeElement.textContent = timeFormatter.format(now);
      dateElement.textContent = dateFormatter.format(now);
    }
  
    // Recursive setTimeout instead of setInterval: each tick recalculates
    // the delay to the next second boundary, so it can't drift over time
    // the way a fixed setInterval eventually does.
    function tick() {
      updateTimeAndDate();
      const msUntilNextSecond = 1000 - (Date.now() % 1000);
      setTimeout(tick, msUntilNextSecond);
    }
  
    tick();
  });

// Logo lockup: make "SPORTS · PHARMA · DATA" exactly as wide as "Karl Marquez".
// Measures both lines after the web fonts load and spreads the difference
// evenly across the tagline's letter-spacing.
function fitBrandTagline() {
  const name = document.querySelector(".brand-name");
  const tag = document.querySelector(".brand-tagline");
  if (!name || !tag) return;

  const textWidth = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().width;
  };

  tag.style.letterSpacing = "0px";
  tag.style.marginRight = "0px";
  const gaps = tag.textContent.trim().length - 1;
  if (gaps < 1) return;

  const spacing = (textWidth(name) - textWidth(tag)) / gaps;
  tag.style.letterSpacing = spacing + "px";
  // letter-spacing also adds space after the last letter; pull it back so right edges align
  tag.style.marginRight = -spacing + "px";
}

document.addEventListener("DOMContentLoaded", fitBrandTagline);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitBrandTagline);
}
window.addEventListener("resize", fitBrandTagline);
