

const token = localStorage.getItem('authToken');  

if (!token) {
  
    document.getElementById('unauthorizedMessage').style.display = 'block';
    document.getElementById('protectedContent').style.display = 'none';
} else {
    document.getElementById('protectedContent').style.display = 'block';
    document.getElementById('unauthorizedMessage').style.display = 'none';

    fetch('https://your-api.com/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
