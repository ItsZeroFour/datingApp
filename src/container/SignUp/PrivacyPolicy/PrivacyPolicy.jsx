import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const PrivicePolicy = () => {
  return (
    <div className="privice-policy">
      <div className="privice__back--link">
        <Link to="/datingapp/signup">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>

      <h1>Privacy Policy</h1>
      <p>
        We consider your privacy in all of our products and service
        developments. We engage a variety of issues, including legal, security,
        design, product development, and others, to ensure that no decision is
        made without regard to your privacy.
      </p>
    </div>
  );
};

export default PrivicePolicy;
