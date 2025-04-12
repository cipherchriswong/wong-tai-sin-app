
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
  // 播放音效
  const audio = new Audio("draw.mp3");
  audio.play();

  // 手機震動
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  // 3 秒後顯示籤文
  const index = Math.floor(Math.random() * fortunes.length);
  setTimeout(() => {
    displayFortune(index);
  }, 3000);
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
