import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ShoppingCart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSellingProductsCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/all-products");
        const bestSelling = res.data.products?.slice(0, 10); // Customize this logic
        setProducts(bestSelling || []);
      } catch (error) {
        console.error("Failed to fetch best-selling products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading best selling products...</p>;
  if (products.length === 0) return <p className="text-center mt-10 text-gray-600">No products found.</p>;

  return (
    <div className="my-10 px-4 md:px-8 group">
      <h2 className="text-2xl font-extrabold !mb-6 text-center text-gray-800 border-b-4 border-blue-500 inline-block pb-2 rounded">
        Best Selling Products
      </h2>

      <Slider {...settings}>
        {products.map(({ _id, name, price, images = [], category }) => {
          const imageUrl = images.length > 0 ? `http://localhost:4000${images[0]}` : "/no-image.png";

          return (
            <div key={_id} className="p-2">
              <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow hover:shadow-xl transition-all duration-300 flex flex-col h-full">

                {/* Product Image */}
                <div className="relative w-full h-56 overflow-hidden p-4">
                  <Link to={`/product/${_id}`}>
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                    Best Seller
                  </span>
                </div>

                {/* Product Info + Buttons */}
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                    <p className="text-xs text-gray-500">{category?.name || "Uncategorized"}</p>
                    <p className="text-green-600 text-xl font-bold mt-1">₹{price}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-1.5 text-sm rounded-lg flex items-center justify-center gap-1">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-green-400 hover:bg-green-500 text-white py-1.5 text-sm rounded-lg flex items-center justify-center gap-1">
                      <Wallet size={16} />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <style>
        {`
          .slick-prev, .slick-next {
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
          }

          .group:hover .slick-prev,
          .group:hover .slick-next {
            opacity: 1;
          }

          .slick-prev:before, .slick-next:before {
            color: #000;
            font-size: 34px;
          }

          .slick-prev {
            left: -10px !important;
          }

          .slick-next {
            right: -10px !important;
          }
        `}
      </style>
    </div>
  );
};

export default BestSellingProductsCarousel;
