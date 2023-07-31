import taco from "../assets/logo.jpg";
import basket from "../assets/basket.svg";
import hat from "../assets/ht.svg";
import search from "../assets/search.svg";
import Line from "../assets/Line.svg";

function LandingPage() {
  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <div className="flex justify-between relative">
        <img
          className="max-w-[60px] max-h-[60px] absolute top-[43px] left-[71px] rounded-full"
          src={taco}
          alt=""
        />
        <div>
          <img
            className="w-[140px] h-[95px] absolute top-[0px] left-[10px]"
            src={hat}
            alt=""
          />
        </div>
        <img
          className="w-[30px] h-[30px] absolute top-[60px] right-[30px]"
          src={basket}
          alt=""
        />
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="pt-[110px] pl-[30px]">
          <p className="text-[16px] font-pop font-normal text-textFont-dark">
            Food
          </p>
          <p className="mt-[-10px] text-[32px] font-pop font-bold text-textFont-dark">
            Delivery
          </p>
          <div className="flex space-x-[10px] mt-[5px]">
            <img className="w-[24px] h-[24px]" src={search} alt="" />
            <p className="text-[16px] font-pop font-normal text-textFont-light">
              Αναζήτηση...
            </p>
          </div>
          <img className="pl-[34px] pr-[30px]" src={Line} alt="" />
          <p className="mt-[20px] text-[16px] font-pop font-semibold text-textFont-dark">
            Επέλεξε Γεύμα
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
