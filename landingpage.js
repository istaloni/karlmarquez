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