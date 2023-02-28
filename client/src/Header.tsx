import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { NavLink, useHistory } from "react-router-dom";
import SideNav from "./SideNav";

function Header() {
  let history = useHistory();

  return (
    <div className="topnav">
      <div className="logo-div">
        <img
          className="logo"
          src="/images/logo-small.png"
          alt="logo"
          onClick={() => history.push(`/`)}
        />
      </div>
      <div className="topnav-center"> 

      <span className="topnav2-left">
        <div id="SideBar">
        <SideNav pageWrapId={"page-wrap"} outerContainerId={"SideBar"} />
        <div id="page-wrap">
        </div>
        </div>
      </span> 

        <span className="topnav2-center">
        <NavLink exact activeClassName="active" to="/">
          {" "}
          HOME
        </NavLink>
        <NavLink activeClassName="active" to="/products/adults">
          ADULTS
        </NavLink>
        <NavLink activeClassName="active" to="/products/children">
          CHILDREN
        </NavLink>
        </span>

        <span className="topnav2-right">
          <NavLink
            exact
            activeClassName="active"
            to="/login"
           >
          <AiOutlineUser/>
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            to="/cart"
           >
            <AiOutlineShoppingCart />
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default Header;
