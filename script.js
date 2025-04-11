
let qianData = [];

fetch('qian100_complete_generated.json')
  .then(res => res.json())
  .then(data => { qianData = data; });

function drawFortune() {
  if (!qianData.length) return;
  const rand = Math.floor(Math.random() * qianData.length);
  const qian = qianData[rand];
  document.getElementById('qianNumber').innerText = `${qian.number} ${qian.fortune}`;
  document.getElementById('qianPoem').innerText = qian.poem;
  document.getElementById('qianMeaning').innerText = qian.meaning;
  document.getElementById('fortuneDisplay').style.display = 'block';
  document.getElementById('smokeEffect').classList.add('show');
  setTimeout(() => {
    document.getElementById('smokeEffect').classList.remove('show');
  }, 800);
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

function shareFortune() {
  const text = `${document.getElementById('qianNumber').innerText}\n${document.getElementById('qianPoem').innerText}\n${document.getElementById('qianMeaning').innerText}`;
  if (navigator.share) {
    navigator.share({ title: "黃大仙籤文", text });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert("籤文已複製，可自行貼上分享！");
    });
  }
}

function enableMotionShake() {
  if (typeof DeviceMotionEvent?.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then(state => {
      if (state === 'granted') window.addEventListener('devicemotion', handleMotion);
    });
  } else {
    window.addEventListener('devicemotion', handleMotion);
  }
}

let lastShake = Date.now();
function handleMotion(e) {
  const acc = e.accelerationIncludingGravity;
  const total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
  if (total > 25 && Date.now() - lastShake > 1000) {
    lastShake = Date.now();
    drawFortune();
  }
}
