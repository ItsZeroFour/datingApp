import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/signup/icon.svg";
import googleIcon from "../../images/signup/google.svg";
import { GoogleLogin } from "react-google-login";

const SignUp = (onSuccess, onFailure) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__top-content">
          <img src={logo} alt="logo" />
          <h1>Sign up to continue</h1>
        </div>

        <div className="signup__button-content">
          <Link
            className="registration__button"
            to="/datingapp/signup/registration"
          >
            Continue with email
          </Link>
        </div>

        <div className="signup__button-alternative">
          <div className="signup__button-alternative-title">
            <div className="dash"></div>
            <p>or sign up with</p>
            <div className="dash"></div>
          </div>

          <div className="signup__button">
            <GoogleLogin
              clientId={clientId}
              buttonText="Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            >
              <img src={googleIcon} alt="google" />
            </GoogleLogin>
          </div>
        </div>

        <footer className="signup__footer">
          <Link to="/datingapp/terms">Terms of use</Link>
          <Link to="/datingapp/privacy_policy">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
