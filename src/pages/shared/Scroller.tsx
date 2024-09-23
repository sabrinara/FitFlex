import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Scroller = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-10 right-4 p-4  rounded bg-orange-600 text-white cursor-pointer shadow-lg hover:bg-orange-700 transition duration-300"
      >
        <FaArrowUp className="text-xl md:text-2xl" />
      </div>
    )
  );
};

export default Scroller;