document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.querySelector(".time");
  const dateElement = document.querySelector(".date");

  // Guard clause to avoid errors if elements don't exist on the page
  if (!timeElement || !dateElement) return;

  function updateTimeAndDate() {
      const now = new Date();

      // Format time cleanly (HH:MM:SS AM/PM)
      const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
      };
      const time = now.toLocaleTimeString('en-US', timeOptions);

      // Format date (e.g., Friday, September 25, 2026)
      const dateOptions = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
      };
      const date = now.toLocaleDateString('en-US', dateOptions);

      // Update the DOM elements
      timeElement.textContent = time;
      dateElement.textContent = date;
  }

  // Initial update on page load
  updateTimeAndDate();

  // Sync interval precisely with the start of the next second
  const msUntilNextSecond = 1000 - (Date.now() % 1000);
  setTimeout(() => {
      updateTimeAndDate();
      setInterval(updateTimeAndDate, 1000);
  }, msUntilNextSecond);
});