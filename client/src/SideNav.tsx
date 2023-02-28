import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

export default (props: { pageWrapId: string; outerContainerId: string }) => {
  return (
    // Pass on our ...props (spread or rest??)
    <Menu className="nav.menu" {...props}>
      <NavLink
        className="menu-item"
        style={{ textAlign: "left" }}
        to="/products/all"
      >
        Show all
      </NavLink>
      <NavLink
        className="menu-item"
        style={{ textAlign: "left" }}
        to="/products/adults"
      >
        Adults
      </NavLink>
      <NavLink
        className="menu-item2"
        style={{ textAlign: "left", marginLeft: "15px", fontSize: "17px" }}
        to="/products/adultsclothes"
      >
        Clothes
      </NavLink>
      <NavLink
        className="menu-item2"
        style={{ textAlign: "left", marginLeft: "15px", fontSize: "17px" }}
        to="/products/adultsaccessories"
      >
        Accessories
      </NavLink>

      <NavLink
        className="menu-item"
        style={{ textAlign: "left" }}
        to="/products/children"
      >
        Children
      </NavLink>
      <NavLink
        className="menu-item2"
        style={{ textAlign: "left", marginLeft: "15px", fontSize: "17px" }}
        to="/products/childrenclothes"
      >
        Clothes
      </NavLink>
      <NavLink
        className="menu-item2"
        style={{ textAlign: "left", marginLeft: "15px", fontSize: "17px" }}
        to="/products/childrenaccessories"
      >
        Accessories
      </NavLink>
    </Menu>
  );
};
