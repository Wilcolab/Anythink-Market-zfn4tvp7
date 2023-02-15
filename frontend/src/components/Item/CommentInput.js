import React from "react";
import agent from "../../agent";
import { useDispatch } from "react-redux";
import { ADD_COMMENT } from "../../constants/actionTypes";

const CommentInput = ({slug, onSubmit, currentUser}) => {
  const [body, setBody] = React.useState('');
  const dispatch = useDispatch()

  const createComment = async (ev) => {
    ev.preventDefault();
    const payload = await agent.Comments.create(slug, {
      body,
    })
    dispatch({ type: ADD_COMMENT, payload })
    setBody('');
  }

    return (
      <form className="card comment-form m-2" onSubmit={createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={(ev) => setBody(ev.target.value)}
            rows="3"
          />
        </div>
        <div className="card-footer">
          <img
            src={currentUser.image}
            className="user-pic mr-2"
            alt={currentUser.username}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
}

export default CommentInput;
