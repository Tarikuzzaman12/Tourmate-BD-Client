import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";

const GManageStory = () => {
  const { user } = useContext(AuthContext); // Fetch the logged-in user's data
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchUserStories = async () => {
        try {
          const response = await fetch(`http://localhost:5000/stories`);
          if (!response.ok) {
            throw new Error('Failed to fetch stories.');
          }
          const data = await response.json();
          
          // Filter stories based on user.email
          const filteredStories = data.filter(
            (story) => story.email === user.email // Ensure 'authorEmail' matches the email in your story schema
          );
          
          console.log("Filtered Stories:", filteredStories); // Debugging line
          setStories(filteredStories); // Set the filtered stories data
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserStories();
    }
  }, [user?.email]); // Re-run the effect when the user's email changes

  if (loading) return <div>Loading stories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
             <div className="flex justify-center mt-2">
  <img
    className="w-48 h-48 rounded-full object-cover"
    src={story.image}
    alt={story.title}
  />
</div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{story.title}</h2>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="text-sm text-gray-500">
                  <p>By {story.
authorName} on {new Date(story.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No stories found for your account.</p>
      )}
    </div>
  );
};

export default GManageStory;
