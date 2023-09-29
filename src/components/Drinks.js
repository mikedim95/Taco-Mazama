import { drinkPics } from "../helpers/drinkPics";
import { Link } from "react-router-dom";

function Drinks() {
  return (
    <div className="flex justify-start items-center space-x-[20px] ">
      {drinkPics.map((drink, index) => {
        return (
          <div
            key={index}
            className="relative w-[50px] h-[50px] rounded-full bg-primary-regular shadow-[2px_2px_3px_rgba(0,0,0,0.5)]"
          >
            <Link
              key={index}
              to={{
                pathname: "/BeveragesPage",
                search: `?index=${index}`,
              }}
            >
              <img
                className="absolute top-[10px] left-[10px] w-[30px] h-[30px]"
                src={drink.img}
                alt=""
              ></img>
              <h1 className="pt-[53px] text-[10px] font-semibold font-pop text-textFont-dark text-center ">
                {drink.title}
              </h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Drinks;
