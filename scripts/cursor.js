const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

const updateCursor = (x, y) => {
  cursor.style.left = `${x}px`;
  caursor.style.top = `${y}px`;
};

document.addEventListener("mousemove", (event) => {
  updateCursor(event.clientX, event.clientY);
  cursor.style.display = "block";
});

document.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  updateCursor(touch.clientX, touch.clientY);
  cursor.style.display = "block";
});

document.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  updateCursor(touch.clientX, touch.clientY);
});

document.addEventListener("touchend", () => {
  cursor.style.display = "none";
});

document.querySelectorAll("a, button, .hover-target").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered");
  });
});
