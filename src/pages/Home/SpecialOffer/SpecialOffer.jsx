import { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "fixed", // Fixed positioning to prevent scrolling
  },
};
Modal.setAppElement("#root");

const SpecialOffer = () => {
  const [offer, setOffer] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/specialOffer.json")
      .then((res) => res.json())
      .then((data) => {
        setOffer(data);
        openModal();
      });
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(offer.image_url);

  return (
    <div className="z-20">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          className="p-[100px]"
          style={{
            backgroundImage: `url('${offer?.image_url}')`,
            backgroundSize: "cover",
          }}
        >
          <div className="mt-6 text-center">
            <h4 className="text-[55px] font-von mb-5 text-[#FFAC41] font-extrabold">
              {offer?.title}
            </h4>
            <h4 className="text-[35px] font-merriweather mb-5 text-white font-semibold line-through">
              {offer?.original_price}
            </h4>
            <h4 className="text-[45px] font-merriweather mb-5 text-green-500 font-extrabold">
              {offer?.discounted_price}
            </h4>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SpecialOffer;
