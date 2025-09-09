document.addEventListener("DOMContentLoaded", () => {
    function updateTime() {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      };
      const timeInAmravati = new Intl.DateTimeFormat("en-IN", options).format(
        new Date()
      );
      document.getElementById("timeDisplay").textContent = timeInAmravati;
    }
  
    // Update time every second
    updateTime(); // Initial call to set time immediately
    setInterval(updateTime, 1000); // Updates every 1 second
  });
