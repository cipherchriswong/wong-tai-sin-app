
const fortunes = [];
for (let i = 1; i <= 100; i++) {
  fortunes.push({
    id: i,
    level: i % 3 === 0 ? "上籤" : i % 3 === 1 ? "中籤" : "下籤",
    content: `這是第 ${i} 籤的詩句內容，富有啟發與智慧。`,
    meaning: `第 ${i} 籤代表的意義：因果循環，謹慎行事，隨緣而安。`
  });
}

function drawFortune() {
  const index = Math.floor(Math.random() * fortunes.length);
  displayFortune(index);

  const audio = new Audio("draw.mp3");
  audio.play();

  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

function displayFortune(index) {
  const fortune = fortunes[index];
  const display = document.getElementById("fortuneDisplay");

  const bgColors = [
    "#f4f1ea", "#f2f7f5", "#fff8e1", "#fce4ec", "#e3f2fd", "#ede7f6"
  ];
  const bgColor = bgColors[index % bgColors.length];

  display.style.backgroundImage = "none";
  display.style.backgroundColor = bgColor;

  document.getElementById("fortuneTitle").innerText = `第${fortune.id}籤 ${fortune.level}`;
  document.getElementById("fortunePoem").innerText = fortune.content;
  document.getElementById("fortuneMeaning").innerText = fortune.meaning;

  display.classList.remove("hidden");
}

function shareFortune() {
  const title = document.getElementById("fortuneTitle").innerText;
  const poem = document.getElementById("fortunePoem").innerText;
  const meaning = document.getElementById("fortuneMeaning").innerText;
  const text = `${title}\n${poem}\n${meaning}`;
  if (navigator.share) {
    navigator.share({ text });
  } else {
    alert("請手動複製分享內容：\n" + text);
  }
}

// 搖手機觸發
let lastShake = Date.now();
window.addEventListener("devicemotion", function (event) {
  const acc = event.accelerationIncludingGravity;
  const threshold = 15;
  if (acc && (Math.abs(acc.x) > threshold || Math.abs(acc.y) > threshold || Math.abs(acc.z) > threshold)) {
    const now = Date.now();
    if (now - lastShake > 1500) {
      drawFortune();
      lastShake = now;
    }
  }
});
