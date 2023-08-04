import { dessertPics } from "../helpers/dessertPics";

function Desserts() {
  return (
    <div className="items-center justify-center relative">
      {dessertPics.map((pic, index) => {
        return (
          <div
            key={index}
            className="absolute w-[100px] h-[50px] left-[5px] top-[-5px]"
          >
            <img className="rounded-t-[20px]" src={pic.img} alt=""></img>
            <div className="flex w-[100px] h-[50px] bg-secondary-light rounded-b-[20px]">
              <h1 className="px-[15px] text-[16px] font-normal font-pop text-white">
                {pic.title}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Desserts;
