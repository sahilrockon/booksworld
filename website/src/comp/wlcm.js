import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import './wlcm.css'; // You may need to adjust the CSS import path

function WelcomeMessage() {
  const [run, setRun] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (run) {
      const animationDuration = 2000;

      // After the animation duration, hide the message and set run to false
      const hideMessage = setTimeout(() => {
        setShowMessage(false);
        setRun(false); // Set run to false after showing the message
      }, animationDuration);

      // Clear the timeout to avoid memory leaks
      return () => {
        clearTimeout(hideMessage);
      };
    }
  }, [run]);

  return (
    <>


      <div id="bg">
        <div className="bg-text">BooksWorld</div>
      </div>
     
      <div className="container">
        <div className="row">
          <div className="col-md-12 welcome-container">
            {showMessage && run && (
              <h1 className="welcome-message">Welcome to our website!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeMessage;
