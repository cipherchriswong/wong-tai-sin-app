
const qianData = [
  {
    number: "第一籤 上籤",
    poem: "天開地闢結良緣，萬里姻緣一線牽。莫道姍姍來遲日，終有佳偶配成全。",
    meaning: "感情美滿、事業順利、宜把握良機。"
  },
  {
    number: "第二籤 中籤",
    poem: "山窮水盡疑無路，柳暗花明又一村。",
    meaning: "困難過後自然開朗，勿灰心。"
  },
  {
    number: "第三籤 下籤",
    poem: "運途多舛未如願，修身積德可轉玄。",
    meaning: "當下不利，宜靜守，待時而動。"
  }
];
function drawFortune() {
  const rand = Math.floor(Math.random() * qianData.length);
  const qian = qianData[rand];
  document.getElementById('qianNumber').innerText = qian.number;
  document.getElementById('qianPoem').innerText = qian.poem;
  document.getElementById('qianMeaning').innerText = qian.meaning;
  document.getElementById('fortuneDisplay').style.display = 'block';
}
function shareFortune() {
  const text = `${document.getElementById('qianNumber').innerText}\n${document.getElementById('qianPoem').innerText}\n${document.getElementById('qianMeaning').innerText}`;
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert('已複製籤文'));
  }
}
window.addEventListener('devicemotion', (event) => {
  const acceleration = event.accelerationIncludingGravity;
  const total = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);
  if (total > 25) drawFortune();
});
