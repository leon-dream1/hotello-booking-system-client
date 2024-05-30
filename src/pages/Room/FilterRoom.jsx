import RangeSlider from "react-range-slider-input";

/* eslint-disable react/prop-types */
const FilterRoom = ({ value, setValue, handleSubmit, handleRating }) => {
  return (
    <form className="mt-[50px]" onSubmit={handleSubmit}>
      <div className="mb-4 text-[16px]">
        Price
        <p className="text-xl mb-4 font-von">
          ${value[0]} - ${value[1]}
        </p>
        <RangeSlider min={0} max={2000} value={value} onInput={setValue} />
      </div>
      <div className="mb-4">
        <p className="mb-6 text-xl">Star Rating</p>
        <label className="label cursor-pointer">
          <input
            type="radio"
            className="radio"
            name="rating"
            value="1"
            onChange={handleRating}
          />
          <span className="label-text">1 star</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            className="radio"
            name="rating"
            value="2"
            onChange={handleRating}
          />
          <span className="label-text">2 star</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            className="radio"
            name="rating"
            value="3"
            onChange={handleRating}
          />
          <span className="label-text">3 star</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            className="radio"
            name="rating"
            value="4"
            onChange={handleRating}
          />
          <span className="label-text">4 star</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            className="radio"
            name="rating"
            value="5"
            onChange={handleRating}
          />
          <span className="label-text">5 star</span>
        </label>
      </div>
      <div>
        <input
          type="submit"
          value="Filter"
          className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
        />
      </div>
    </form>
  );
};

export default FilterRoom;
