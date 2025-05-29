const images = [
  "assets/images/profile1.png",
  "assets/images/profile2.png"
];

let currentIndex = 0;

function switchImage() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("profile-pic").src = images[currentIndex];
}

const profiles = [
  {
    image: "assets/images/profile1.png",
    name: "Akira Night",
    code: "NCX-2045-77A",
    origin: "Night City"
  },
  {
    image: "assets/images/profile2.png",
    name: "Lena Circuit",
    code: "NVR-5088-Z3R",
    origin: "Neo Kyoto"
  }
];

function switchImage() {
  currentIndex = (currentIndex + 1) % profiles.length;
  const profile = profiles[currentIndex];
  document.getElementById("profile-pic").src = profile.image;
  document.getElementById("name").textContent = profile.name;
  document.getElementById("code").textContent = profile.code;
  document.getElementById("origin").textContent = profile.origin;
}

function toggleAudio() {
  const tracks = [
    document.getElementById("ambiance-audio"),
    document.getElementById("electric-hum"),
    document.getElementById("announcer")
  ];
  const toggleBtn = document.getElementById("audio-toggle");
  const isMuted = tracks[0].muted;

  tracks.forEach(track => {
    track.muted = !isMuted;
  });

  toggleBtn.textContent = isMuted ? "Mute Audio" : "Unmute Audio";
}

// Random ambient announcements (one-off sounds)
const eventSounds = [
  "assets/audio/alert1.mp3",
  "assets/audio/announcement1.mp3",
  "assets/audio/ambient_vox1.mp3"
];

function playRandomEventSound() {
  const randomIndex = Math.floor(Math.random() * eventSounds.length);
  const sound = new Audio(eventSounds[randomIndex]);
  sound.volume = 0.6;
  sound.play();
}

// Trigger a random sound every 20-40 seconds
setInterval(() => {
  playRandomEventSound();
}, Math.random() * 20000 + 20000);

function initWebGLParticles() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("webgl-bg").appendChild(renderer.domElement);

  const particleCount = 300;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < particleCount; i++) {
    positions.push((Math.random() - 0.5) * 50);
    positions.push((Math.random() - 0.5) * 50);
    positions.push((Math.random() - 0.5) * 50);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.3, transparent: true });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0015;
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();
}

window.addEventListener("load", initWebGLParticles);

function detectMobilePlatform() {
  const ua = navigator.userAgent;
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function enableSwipeGestures() {
  let touchStartX = 0;
  let touchEndX = 0;
  const threshold = 100;

  const container = document.getElementById('passport-container');

  container.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  container.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, false);

  function handleGesture() {
    if (touchEndX < touchStartX - threshold) {
      switchImage();
      container.classList.add('page-flip');
      setTimeout(() => container.classList.remove('page-flip'), 600);
    }
  }
}

window.addEventListener("load", function () {
  updateProfile();
  if (detectMobilePlatform()) {
    enableSwipeGestures();
  }
});