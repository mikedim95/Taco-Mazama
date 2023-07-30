import taco from "../assets/taco_logo.jpg";

function LandingPage() {
  return (
    <div className="max-w-screen-sm h-screen mx-auto bg-background-light overflow-scroll">
      <div className="flex justify-between">
        <img className="w-[60px] h-[60px] rounded-full" src={taco} alt="" />
      </div>
    </div>
  );
}

export default LandingPage;
