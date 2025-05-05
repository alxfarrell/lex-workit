

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; token

        localStorage.setItem('authToken', token);

        window.location.href = 'index.html';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
}

const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
\
    localStorage.removeItem('authToken');
    sessionStorage.clear(); 

    document.cookie = 'sessionToken=; Max-Age=0; path=/;';

    window.location.href = 'login.html';

    alert('You have been logged out.');
  });
}
