import React, { useState } from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // React Icons for stars

const Homepage = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      // Simulate fetching data based on the search query
      setData({
        image: "https://via.placeholder.com/300",
        description:
          "Samsung is genius because it's the opposite of Apple. Apple is not genius because we can't afford it, that's why we are not fit.",
        ratings: 4.5, // Rating value between 0 and 5
        price: "$299",
        link: "https://www.google.com", // Dummy link for the Buy Now button
      });
      setSearchClicked(true);
    }
  };

  const renderStars = (rating) => {
    // Rating can range from 0 to 5
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative w-full min-h-auto bg-transparent text-white">
      {/* Before Clicking: Search Bar and Button */}
      <div className="flex justify-center items-center w-10/12 mx-auto h-24 mt-12">
        <div className="flex items-center w-full max-w-3xl p-4 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 text-white bg-[#191919] w-full border-b-2 border-[#191919] focus:outline-none"
          />
          <button
            onClick={handleSearchClick}
            className="ml-4 px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-white hover:shadow-md hover:shadow-white"
          >
            <FaSearch className="inline mr-2" />
            Search
          </button>
        </div>
      </div>

      {/* After Clicking: Show Details in Row Layout */}
      {searchClicked && data && (
        <div className="flex flex-col md:flex-row justify-center mx-auto p-6 mt-12 w-10/12">
          {/* Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={data?.image}
              alt="Product"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>

          {/* Product Details (Description, Ratings, Price, and Buy Now Button) */}
          <div className="flex flex-col md:w-1/2 justify-center md:items-start text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">{data?.description}</h2>

            {/* Ratings with Stars and Rating Number */}
            <div className="flex items-center mb-6"> {/* Increased margin-bottom for more space */}
              {renderStars(data?.ratings)}
              <span className="ml-2 text-yellow-500 text-lg font-semibold">{data?.ratings}</span>
            </div>

            {/* Price and Buy Now Button */}
            <div className="flex justify-between items-center mb-8 space-x-8"> {/* Increased margin-bottom and space between price and button */}
              <p className="text-lg font-bold">{data?.price}</p>
              <a
                href={data?.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-red-500 hover:shadow-md hover:shadow-red-500/50`}
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
