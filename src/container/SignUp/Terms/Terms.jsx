import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="terms">
      <div className="terms__back--link">
        <Link to="/datingapp/signup">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>

      <h1>Terms</h1>

      <p className="terms__text">
        1. We have the right to carry the current Agreement and Service.
        Expected changes may be due to a number of reasons, including changes to
        its laws or security, compliance with new features, and changes in
        business practices. The latest version of this posting is published on
        the Service in the "Settings" section, as well as on the gotinder.com
        website. We recommend that you regularly check for updates, as the
        latest version of the meeting is the current one. If we make material
        changes that relate to the rights or obligations of the user, we will
        notify you of these changes in advance no later than 30 days (unless we
        are unable to do so in accordance with applicable law) in a suitable
        way, which may include notices through the Service or email. By
        continuing to use the Service after the changes take effect, you agree
        to the new version of the Agreement.
      </p>

      <p className="terms__text">
        2. You may not create an account, access or use the Service or the
        systems on which it is built, unless all of the following conditions are
        met:
        <ul className="terms__list">
          <li>you are at least 16 years old;</li>

          <li>
            have the right to enter into a legally binding contract with
            datingApp;
          </li>

          <li>
            you are not a person who is prohibited from using the Service under
            the laws of the United States or any other jurisdiction (for
            example, you are not on the US Treasury Department's Specially
            Designated Nationals and Banned Persons List or other similar
            prohibition);
          </li>

          <li>
            You agree to comply with this Agreement and all applicable local,
            state, national and international laws and regulations;
          </li>

          <li>
            have not been convicted of a felony or punishable offense (or a
            crime of similar gravity), a sexual offense or any crime of
            violence; are not required to register on any federal or state sex
            offender registry.
          </li>
        </ul>
      </p>
    </div>
  );
};

export default Terms;
