import { useState, useEffect } from "react";
import '../style.css';

function Cindex() {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    const fetchWorkouts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:4004/api/workouts", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setWorkouts(data);
        } catch (err) {
            console.error('Error fetching workouts:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    // Filter and sort workouts
    const filteredAndSortedWorkouts = workouts
        .filter(workout => 
            workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workout.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

    return (
        <div className="container">
            <h1>Workout Library</h1>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={fetchWorkouts} className="retry-button">
                        Retry
                    </button>
                </div>
            )}

            {loading && (
                <div className="loading-message">
                    <p>Loading workouts...</p>
                </div>
            )}

            {/* Workouts Grid */}
            <div className="workouts-grid">
                {!loading && !error && filteredAndSortedWorkouts.length === 0 ? (
                    <div className="no-workouts">
                        {searchTerm ? "No workouts match your search" : "No workouts available"}
                    </div>
                ) : (
                    filteredAndSortedWorkouts.map(workout => (
                        <div key={workout._id} className="workout-card">
                            <div className="workout-header">
                                <h3>{workout.name}</h3>
                            </div>
                            <div className="workout-content">
                                <p className="workout-description">{workout.description}</p>
                                {workout.youtubeLinks && workout.youtubeLinks.length > 0 && (
                                    <div className="workout-links">
                                        <a 
                                            href={workout.youtubeLinks[0]} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="youtube-link"
                                        >
                                            Watch Tutorial
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Cindex;