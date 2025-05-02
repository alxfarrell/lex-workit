// login.js

// LOGIN FORM HANDLING
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

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
        const token = data.token; // Assuming the token is in data.token

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Redirect to the home or protected page
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

// LOGOUT BUTTON HANDLING
const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    // Remove token
    localStorage.removeItem('authToken');
    sessionStorage.clear(); // Optional: clear temporary session data

    // Optionally clear cookies (example: sessionToken)
    document.cookie = 'sessionToken=; Max-Age=0; path=/;';

    // Redirect to login page
    window.location.href = 'login.html';

    alert('You have been logged out.');
  });
}
