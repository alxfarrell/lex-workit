import { useState, useEffect } from "react";

function Cindex() {
    const [workouts, setWorkouts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: "",
        youtubeLinks: ""
    });

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const imagesArray = formData.images.split(",").map(url => url.trim());
        const youtubeLinksArray = formData.youtubeLinks.split(",").map(url => url.trim());

        const response = await fetch("http://localhost:5001/api/workout", { // Ensure backend API is correct
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                images: imagesArray,
                youtubeLinks: youtubeLinksArray
            })
        });

        if (response.ok) {
            alert("Workout saved!");
            fetchWorkouts(); // Reload workouts
        } else {
            alert("Error saving workout.");
        }
    };

    // Load workouts when the page first loads
    const fetchWorkouts = async () => {
        const response = await fetch("http://localhost:5001/api/workout");
        const data = await response.json();
        setWorkouts(data);
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <div>
            <h1>Workout Tracker</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Workout Name" required onChange={handleChange} />
                <input type="text" id="description" placeholder="Description" required onChange={handleChange} />
                <input type="text" id="images" placeholder="Image URLs (comma-separated)" onChange={handleChange} />
                <input type="text" id="youtubeLinks" placeholder="YouTube Links (comma-separated)" onChange={handleChange} />
                <button type="submit">Add Workout</button>
            </form>

            <h2>Saved Workouts</h2>
            <div>
                {workouts.map(workout => (
                    <div key={workout._id}>
                        <h3>{workout.name}</h3>
                        <p>{workout.description}</p>
                        {workout.images.map(img => <img key={img} src={img} alt="Workout" width="100" />)}
                        {workout.youtubeLinks.map(link => <a key={link} href={link} target="_blank" rel="noopener noreferrer">YouTube</a>)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cindex;