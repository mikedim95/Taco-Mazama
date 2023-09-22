import { Link } from "react-router-dom";
import { useMyContext } from "../context/UseMyContext";

function Sides({ sides }) {
  const { setCurrentSide } = useMyContext();
  const handleSides = (side) => {
    setCurrentSide({
      img: side.img,
      title: side.title,
      subtitle: side.subtitle,
      price: side.price,
      multiplier: 1,
    });
  };

  const renderedLandDesserts = sides.map((side, index) => {
    return (
      <div key={index} onClick={() => handleSides(side)} className="relative">
        <Link key={index} to={`/SidesPage`}>
          <h1
            className=" absolute right-[8px] top-[5px] text-[16px] font-semibold font-pop text-white "
            style={{ textShadow: "0 0 2px rgba(0, 0, 0, 1)" }}
          >
            {side.price} €
          </h1>
          <div className="flex-shrink-0 top-[-5px] relative;">
            <img
              className="w-[95px] h-auto object-contain rounded-t-[20px] shadow-[2px_2px_3px_rgba(0,0,0,0.5)]"
              src={side.img}
              alt=""
            ></img>

            <div className="flex w-[95px] h-[70px] shadow-[2px_2px_3px_rgba(0,0,0,0.5)] bg-secondary-light rounded-b-[20px]">
              <h1
                className="text-[14px] mx-[8px] text-center font-semibold font-pop text-white"
                style={{
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                  whiteSpace: "pre-line",
                }}
              >
                {side.title}
              </h1>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex overflow-x-auto pb-[10px] justify-start gap-[5px] items-start ">
      {renderedLandDesserts}
    </div>
  );
}

export default Sides;
