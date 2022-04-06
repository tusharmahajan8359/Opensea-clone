import React from "react";
import {Link} from "react-router-dom"
import "./helpDesk.css";
import { BiSearch } from "react-icons/bi";
import { CardHelp } from "./CardHelp";
import { carditem, questions } from "./DataHelp";
export const HelpDesk = () => {
  return (
    <div>
      {/* <nav className="navbar navbar-expand-md navbar-light bg-light stick-top mx-5">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fw-bold" to="#">
            <img
              src="/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Oasis
          </Link>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active fs-3" aria-current="page" to="#"
              >Help Center</a
              >
            </li>
          </ul>
          <button
            className="btn btn-primary d-none d-md-block"
            type="button"
            data-bs-toggle="collapse"
          >
            Submit a request
          </button>
        </div>
      </nav> */}

      <main className="container-fluid">
        <div
          className="d-flex align-items-center helpDesk-hero mb-5"
          style={{ height: "300px" }}
        >
          <form
            className="d-flex m-auto align-items-center px-2 bg-body rounded"
            style={{
              height: "44px",
              width: "500px",
              backgroundColor: "rgba(255, 0, 0, 0.1) ",
            }}
          >
            <BiSearch size="24px" />
            <input
              className="form-control w-100 mx-2 my-0 shadow-none border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        <div className="container my-5">
          <div className="row row-cols-1 row-cols-md-2 g-3 ">
            {carditem.map((item) => {
              return <CardHelp title={item.title} desc={item.desc} />;
            })}
          </div>
        </div>

        <div className="container mb-5">
          <h4 className="title fw-bolder my-5">Promoted articles</h4>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {questions.map((que) => {
              return (
                <div className="col">
                  <Link to="http://" className="text-decoration-none text-dark">
                    <h5 className="title-inner"> {que} </h5>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
