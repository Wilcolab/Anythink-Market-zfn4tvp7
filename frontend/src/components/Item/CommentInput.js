import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { ADD_COMMENT } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

const CommentInput = ({slug, onSubmit, currentUser}) => {
  const [body, setBody] = React.useState('');
  const inputRef = React.useRef();

  const createComment = async (ev) => {
    ev.preventDefault();
    const tempBody = body
    setBody('')
    inputRef.current.innerText = ''
    const payload = await agent.Comments.create(slug, {
      tempBody,
    })
    await onSubmit(payload);
  }

    return (
      <form className="card comment-form m-2" onSubmit={createComment}>
        <div className="card-block">
          <textarea
            ref={inputRef}
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

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
