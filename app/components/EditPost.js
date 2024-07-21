import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import Page from "./Page";
import LoadingDotsIcon from "./LoadingDotsIcon";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function EditPost() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialValues = {
    title: {
      value: "",
      hasErrors: false,
      msg: "",
    },
    body: { value: "", hasErrors: false, msg: "" },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
  };

  function ourCallback(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        break;
      case "titleChange":
        draft.title.value = action.value;
        break;
      case "bodyChange":
        draft.body.value = action.value;
        break;
      case "submitRequest":
        draft.sendCount++;
        break;
      case "saveRequestStarted":
        draft.isSaving = true;
        break;
      case "saveRequestFinished":
        draft.isSaving = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ourCallback, initialValues);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({ type: "submitRequest" });
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        dispatch({ type: "fetchComplete", value: response.data });
      } catch (e) {
        console.error(e);
      }
    }
    fetchPost();

    return () => ourRequest.cancel();
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });

      const ourRequest = Axios.CancelToken.source();
      async function fetchPost() {
        try {
          const response = await Axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token,
            },
            {
              cancelToken: ourRequest.token,
            }
          );
          dispatch({ type: "saveRequestFinished" });
          appDispatch({ type: "flashMsg", value: "Post successfully edited" });
        } catch (e) {
          console.error(e);
        }
      }
      fetchPost();

      return () => ourRequest.cancel();
    }
  }, [state.sendCount]);

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="Edit post">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            value={state.title.value}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            value={state.body.value}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          />
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          {state.isSaving ? "Saving..." : "Save Update"}
        </button>
      </form>
    </Page>
  );
}

export default EditPost;
