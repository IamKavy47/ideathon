const flickerElement = document.getElementById("flicker");
const text1 = "Innovate. Ideate. Elevate.<br>Join the College-Exclusive<br>Ideathon '25";
const text2 = `<span class="large">ThinkUp '25</span><br>Sep 15-18 '25`;

setInterval(() => {
  flickerElement.innerHTML = flickerElement.innerHTML === text1 ? text2 : text1;
}, 5000);

