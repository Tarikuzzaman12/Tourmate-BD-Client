import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../Components/Provider/AuthProvider";

const Stories = () => {
  const { user } = useContext(AuthContext); // Get the authenticated user
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all stories from the server
    fetch("http://localhost:5000/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
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
      <h2 className="text-2xl text-center mb-10 font-bold">All  Stories</h2>

      {/* Display 4 random stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stories.map((story) => (
          <div key={story.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
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
                url={`http://localhost:5000/stories/${story.id}`}
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

   
    </div>
  );
};

export default Stories;
