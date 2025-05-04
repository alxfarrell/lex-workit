
document.title = 'lex-workit';
const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
document.head.appendChild(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.head.appendChild(metaViewport);

const metaDescription = document.createElement('meta');
metaDescription.setAttribute('name', 'description');
metaDescription.setAttribute('content', 'Sena App - Home Page');
document.head.appendChild(metaDescription);

const linkStylesheet = document.createElement('link');
linkStylesheet.setAttribute('rel', 'stylesheet');
linkStylesheet.setAttribute('href', 'css/styles.css');
document.head.appendChild(linkStylesheet);

const linkFavicon = document.createElement('link');
linkFavicon.setAttribute('rel', 'icon');
linkFavicon.setAttribute('href', 'assets/favicon.ico');
document.head.appendChild(linkFavicon);

// Build the nav
const nav = document.createElement('nav');
nav.className = 'navbar';
nav.innerHTML = `
  <a href="index.html">Home</a>
  <a href="login.html">Login</a>
  <a href="register.html">Register</a>
  <a href="profile.html">Profile</a>
`;
document.body.appendChild(nav);

// Main content
const main = document.createElement('main');
main.innerHTML = `
  <h1>Transform Your Fitness Journey Today</h1>
  <p>Discover workouts that match your goals. Train smart. Stay strong.</p>
  <img src="workout.jpg" alt="Workout" style="width: 100%; max-height: 400px; object-fit: cover;" />

  <div id="protectedContent" style="display: none;">
    <section class="workout-grid">
      <div class="workout-card">
        <h3>Burpees</h3>
        <p>Quick, intense full-body movement to boost heart rate and burn calories.</p>
        <p><strong>Duration:</strong> 30sec</p>
        <p><strong>Times:</strong> 3 rounds</p>
        <a href="https://health.clevelandclinic.org/how-to-do-burpee" target="_blank">Watch Video</a>
      </div>
    </section>
    <button id="logoutBtn">Logout</button>
  </div>

  <p id="unauthorizedMessage" style="display: none;">You are not authorized to view this page. Please log in.</p>
`;
document.body.appendChild(main);

// Include logic for JWT auth check and logout
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  const protectedContent = document.getElementById('protectedContent');
  const unauthorizedMessage = document.getElementById('unauthorizedMessage');

  if (token) {
    protectedContent.style.display = 'block';
  } else {
    unauthorizedMessage.style.display = 'block';
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      document.cookie = 'sessionToken=; Max-Age=0; path=/;';
      window.location.href = 'login.html';
    });
  }
});
