// home.js

const token = localStorage.getItem('authToken');  // Retrieve the JWT from localStorage

if (!token) {
    // If no token is found, redirect to login page
    document.getElementById('unauthorizedMessage').style.display = 'block';
    document.getElementById('protectedContent').style.display = 'none';
} else {
    // If token exists, show protected content
    document.getElementById('protectedContent').style.display = 'block';
    document.getElementById('unauthorizedMessage').style.display = 'none';

    // Optionally, fetch protected data from server
    fetch('https://your-api.com/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Send the token in Authorization header
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // You can use this data to dynamically populate the page if needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
