import axios from "axios";
import { useEffect, useState } from "react";

const Review = () => {
  // eslint-disable-next-line no-unused-vars
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/review").then((res) => {
      console.log(res.data);
      setReview(res.data);
    });
  }, []);
  return <div></div>;
};

export default Review;
