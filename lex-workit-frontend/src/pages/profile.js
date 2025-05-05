
if (!document.cookie.includes("sessionToken")) {
    window.location.href = "login.html"; 
}

fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: { "Authorization": `Bearer ${document.cookie.split("=")[1]}` }
})
.then(response => response.json())
.then(data => {
    document.querySelector("p:nth-child(2)").innerText = `Username: ${data.username}`;
    document.querySelector("p:nth-child(3)").innerText = `Email: ${data.email}`;
    document.querySelector("p:nth-child(4)").innerText = `Bio: ${data.bio}`;
})
.catch(() => {
    console.error("Failed to load profile data");
});


document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const workout = e.target.parentElement.querySelector("h4").innerText;
        const scheduleList = document.getElementById("schedule-list");

        const listItem = document.createElement("li");
        listItem.innerText = workout;
        scheduleList.appendChild(listItem);
    });
});


document.getElementById("save-schedule").addEventListener("click", () => {
    const scheduleItems = Array.from(document.querySelectorAll("#schedule-list li"))
        .map(item => item.innerText);

    fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: scheduleItems })
    })
    .then(() => {
        document.getElementById("schedule-message").innerText = "Schedule saved!";
    })
    .catch(() => {
        document.getElementById("schedule-message").innerText = "Failed to save!";
    });
});


document.getElementById("logoutButton").addEventListener("click", () => {
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html"; // Redirect to login after logout
});