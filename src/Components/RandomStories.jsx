import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider"; // Ensure AuthProvider is correctly set up
import { FacebookShareButton, FacebookIcon } from "react-share";

const RandomStories = () => {
  const { user } = useContext(AuthContext); // Get the authenticated user
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch 4 random stories from the server
    fetch("https://tour-mate-bd-server-site.vercel.app/stories/random")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle and select 4 random stories
        const shuffled = data.sort(() => 0.5 - Math.random());
        setStories(shuffled.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  const handleShare = (story) => {
    if (!user) {
      alert("You need to be logged in to share a story");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-10">Random Stories</h2>

      {/* Display 4 random stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stories.map((story) => (
          <div key={story._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-72 h-72 rounded-full" src={story.image} alt={story.storyTitle} />
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2">{story.storyTitle}</h2>
              <p className="text-gray-700 text-base">{story.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                By {story.author} on {new Date(story.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <FacebookShareButton
                url={`https://tour-mate-bd-server-site.vercel.app/stories/${story.id}`}
                quote={`Check out this story: ${story.storyTitle}`}
                hashtag="#RandomStories"
                onClick={() => handleShare(story)}
                className="flex items-center"
              >
                <FacebookIcon size={32} round className="mr-2" />
                Share on Facebook
              </FacebookShareButton>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <Link to="/stories">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">All Stories</button>
        </Link>
        <Link to="/stories">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add Story</button>
        </Link>
      </div>
    </div>
  );
};

export default RandomStories;
