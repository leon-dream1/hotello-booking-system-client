import { RiDrinks2Line } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import { CgGym } from "react-icons/cg";

const Slide = () => {
  return (
    <div className="h-[800px] flex flex-col items-center justify-center">
      <h1 className="text-[80px] font-von">
        Welcome to <span className="text-[#FFAC41]">Hotello</span>
      </h1>
      <div className="flex gap-8 space-x-[80px] mt-[50px]">
        <div>
          <RiDrinks2Line size={50}/>
          <h4 className="text-[30px] font-merriweather">Drinks</h4>
        </div>
        <div>
          <MdEventAvailable size={50}/>
          <h4 className="text-[30px] font-merriweather">Events</h4>
        </div>
        <div>
          <CgGym size={50}/>
          <h4 className="text-[30px] font-merriweather">Gym</h4>
        </div>
      </div>
    </div>
  );
};

export default Slide;
