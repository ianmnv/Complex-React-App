import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token,
        });
        // console.log(response.data);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchPosts();

    return () => ourRequest.cancel();
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((post) => {
        const now = new Date(post.createdDate);
        const date = new Intl.DateTimeFormat(navigation.location, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(now);

        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={post.author.avatar} />{" "}
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">on {date}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
