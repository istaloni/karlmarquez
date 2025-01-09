const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function updateTimeAndDate() {
    const now = new Date();
    
    // Format time (HH:MM:SS)
    const time = now.toLocaleTimeString();
    
    // Format date (e.g., Monday, January 1, 2025)
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
    // Update the HTML elements
    timeElement.textContent = time;
    dateElement.textContent = date;
  }
  
  // Update every second
  setInterval(updateTimeAndDate, 1000);
  
  // Initial call to set time and date immediately
  updateTimeAndDate();