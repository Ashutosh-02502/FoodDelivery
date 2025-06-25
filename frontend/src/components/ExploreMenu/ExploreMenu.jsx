import React from "react";
import "./ExploreMenu.css";
import { useState } from "react";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore Menu</h2>
      <p className="explore-menu-text">
        Browse through our categories to find your perfect meal. Dive into our
        appetizers for a tantalizing start, explore our main courses for a
        satisfying feast, and don’t forget to check out our desserts for a sweet
        finish. Experience the convenience of gourmet dining at home and let us
        bring the restaurant experience to your doorstep. Whether it’s a casual
        meal, a special occasion, or anything in between, our menu promises to
        delight and satisfy.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
