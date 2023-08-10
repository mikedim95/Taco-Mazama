import { dessertPics } from "../helpers/dessertPics";

function Desserts() {
  return (
    <div className="flex overflow-x-auto pb-[10px] justify-start gap-[5px] items-start ">
      {dessertPics.map((pic) => {
        return (
          <div className="relative">
            <h1
              className=" absolute right-[8px] top-[5px] text-[16px] font-semibold font-pop text-price-light "
              style={{ textShadow: "0 0 2px rgba(0, 0, 0, 1)" }}
            >
              {pic.price}
            </h1>
            <div key={pic.title} className="flex-shrink-0 top-[-5px] relative;">
              <img
                className="w-[95px] h-auto object-contain rounded-t-[20px] shadow-[2px_2px_3px_rgba(0,0,0,0.5)]"
                src={pic.img}
                alt=""
              ></img>

              <div className="flex w-[95px] h-[50px] shadow-[2px_2px_3px_rgba(0,0,0,0.5)] bg-secondary-light rounded-b-[20px]">
                <h1
                  className="px-[18px] text-[16px] font-semibold font-pop text-white "
                  style={{ textShadow: "0 0 2px rgba(0, 0, 0, 1)" }}
                >
                  {pic.title}
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Desserts;
