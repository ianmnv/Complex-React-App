import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "react-tooltip";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import Page from "./Page";
import LoadingDotsIcon from "./LoadingDotsIcon";
import NotFound from "./NotFound";

function ViewSinglePost() {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchPost();

    return () => ourRequest.cancel();
  }, []);

  if (!post && !isLoading) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const now = new Date(post.createdDate);
  const date = new Intl.DateTimeFormat(navigation.location, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username === post.author.username;
    }
    return false;
  }

  async function deleteCB() {
    const areYouSure = window.confirm("Are you sure to delete this post?");

    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: { token: appState.user.token },
        });
        console.log(response.data);
        if (response.data === "Success") {
          // 1. Display flash message
          appDispatch({ type: "flashMsg", value: "Post successfully deleted" });
          // 2. Redirect to home page
          navigate(`/profile/${appState.user.username}`);
        }
      } catch (err) {
        console.error(`${err}, There was a problem`);
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link
              to={`/post/${id}/edit`}
              data-tooltip-content="Edit"
              data-tooltip-id="edit"
              className="text-primary mr-2"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <Tooltip id="edit" className="custom-tooltip" />{" "}
            <a
              onClick={deleteCB}
              data-tooltip-content="Delete"
              data-tooltip-id="delete"
              className="delete-post-button text-danger"
            >
              <i className="fas fa-trash"></i>
            </a>
            <Tooltip id="delete" className="custom-tooltip" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {date}
      </p>

      <div className="body-content">
        <ReactMarkdown
          children={post.body}
          allowedElements={[
            "p",
            "br",
            "strong",
            "em",
            "h1",
            "h2",
            "h3",
            "h4",
            "li",
            "ol",
            "ul",
          ]}
        />
      </div>
    </Page>
  );
}

export default ViewSinglePost;
