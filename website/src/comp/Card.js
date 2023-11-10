import React, { useState } from "react";
import { motion } from "framer-motion";
import defaultBook from "./img/default.jpg";
import { BiLinkExternal } from "react-icons/bi";
import "./card.css";

export default function Card({ id, volumeInfo }) {
  let { title, authors, publisher, previewLink, imageLinks } = volumeInfo;

  const [heartColor, setHeartColor] = useState("black");

  // setting up default values for volume info data
  title = title || "Title is not available";
  authors = authors || "Author(s) name not available";
  publisher = publisher || "Publisher company not available";
  previewLink = previewLink || "https://books.google.co.in/";

  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };

  const handleHeartClick = () => {
    setHeartColor(heartColor === "black" ? "red" : "black");
    console.log(id);
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div className="card" align="center">
          <div>
            <div>
              <motion.img
                src={imageLinks ? imageLinks.thumbnail : defaultBook}
                width="100px"
                height="150px"
                alt="Book-cover"
                variants={imageVariants}
                whileHover="hover"
              />
              <br />
            </div>
            {/* Heart icon for liking */}
            <span className="heart-icon" onClick={handleHeartClick} style={{ color: heartColor ,fontSize: "24px"}}>
              <i className="fas fa-heart"></i>
            </span>
          </div>
          <div>
            <p className="card-content" style={{ fontWeight: "bold" }}>
              {title}
            </p>
            <p className="card-content">
              <span style={{ fontWeight: "bold" }}>Author:</span> {authors}

            </p>

            <p className="card-content">
            <span style={{ fontWeight: "bold" }}>Publisher:</span> {publisher}

            </p>
            <div>
          {previewLink && (
            <h6
              style={{
                fontWeight: "bold",
                color: "black",
                paddingBottom: "1rem",
              }}
            >
              Read more :{" "}
              <a href={previewLink} target="_blank" rel="noreferrer">
                {" "}
                Google Books <BiLinkExternal></BiLinkExternal>{" "}
              </a>
            </h6>
          )}
        </div>

          
          </div>
        </div>
      </div>
    </>
  );
}
