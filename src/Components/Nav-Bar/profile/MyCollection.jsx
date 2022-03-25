import React from "react";
import { Switch, Router, Route, Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
export const MyCollection = () => {
  function handleMyCollection() {
    // <Route path="/My collections/exploremycollection"> </Route>
  }
  return (
    <div className="container px-5 mb-5">
      <h1 className="title fw-bold py-5">My Collections</h1>
      <p className="text subheading text-muted">
        Create, curate, and manage collections of unique NFTs to share and sell.
        <span
          className="d-inline-block box-shadow rounded-circle p-1 px-3 fs-2 m-2"
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Collections can be created either directly on Oasis or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to Oasis. Learn more about creating NFTs for free on Oasis"
        >
          i
        </span>
      </p>
      <Link to="/my collections/create" className="btn btn-primary btn-lg me-3">
        Create a Collection
      </Link>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg p-3 px-5"
        onClick={handleMyCollection}
      >
        <BsThreeDotsVertical size={24} />
      </button>
    </div>
  );
};
