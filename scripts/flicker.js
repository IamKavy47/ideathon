const flickerElement = document.getElementById("flicker");
const text1 = "National level<br>Techno-Cultural<br>Fest '25";
const text2 = `<span class="large">Infinitus</span><br>Feb 5-8 '25`;

setInterval(() => {
  flickerElement.innerHTML = flickerElement.innerHTML === text1 ? text2 : text1;
}, 5000);
