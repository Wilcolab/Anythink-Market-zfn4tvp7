import React, {useState} from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import { connect } from "react-redux";
import { APPLY_TITLE_FILTER } from "../../constants/actionTypes";

const MINIMUM_CHARACTERS = 3

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (payload) =>
    dispatch({ type: APPLY_TITLE_FILTER, payload }),
});

const Banner = (props) => {
  const [searchText, setSearchText] = useState('');

  function searchTextChangeHandler(ev) {
    const newSearchText = ev.target.value
    setSearchText(newSearchText)

    if (newSearchText.length >= MINIMUM_CHARACTERS) {
      agent.Items.byTitle(newSearchText).then(items => {
        props.onSearchChange({...items, searchText: newSearchText})
      }).catch(err => console.error(err))
    }
  }

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part">get</span>
          <input id="search-box" value={searchText} onChange={searchTextChangeHandler} placeholder="What is it that you truly desire?" type="text" />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(Banner);
