import React from "react";
import { MealGrid } from "../../components";

const MenuItem = ({ meals }) => {
  return (
    <section>
      <MealGrid meals={meals} text={"Menu"} />
    </section>
  );
};

export default MenuItem;
