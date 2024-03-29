import React, { useEffect, useState } from "react";

import {
  faSpinner,
  faCheck,
  faTimes,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { get } from "../../utils/requests";

const renderStatus = (status) => {
  if (status == "loading") {
    return (
      <div className="d-flex flex-row text-muted align-items-center">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p id="email-validation-loading" className="ml-2 mb-0">
          We're checking the allowlist...
        </p>
      </div>
    );
  } else if (status == "error") {
    return (
      <div className="d-flex flex-row text-danger align-items-center">
        <FontAwesomeIcon icon={faTimes} />
        <p id="email-validation-error" className="ml-2 mb-0">
          You are not on the allowlist yet. Please request access.
        </p>
      </div>
    );
  } else if (status == "unapproved") {
    return (
      <div className="d-flex flex-row text-warning align-items-center">
        <FontAwesomeIcon icon={faQuestion} />
        <p id="email-validation-unapproved" className="ml-2 mb-0">
          You haven't been approved yet.. reach out to us on why you should join
          right now!
        </p>
      </div>
    );
  } else if (status == "approved") {
    return (
      <div className="d-flex flex-row text-success align-items-center">
        <FontAwesomeIcon icon={faCheck} />
        <p id="email-validation-approved" className="ml-2 mb-0">
          You're in the allowlist!
        </p>
      </div>
    );
  }
};

const EmailValidation = ({ changeStep, email }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    get(`/wait_list?email=${email.toLowerCase()}`).then((response) => {
      if (response.error) {
        setStatus("error");
      } else {
        if (response.approved) {
          setStatus("approved");
        } else {
          setStatus("unapproved");
        }
      }
    });
  }, [email]);

  return (
    <div className="d-flex flex-column" style={{ maxWidth: 400 }}>
      <h6 className="registration_step_subtitle">Step 2 of 4</h6>
      <h1>Validating access</h1>
      {renderStatus(status)}
      <div className="d-flex flex-row justify-content-end">
        <button
          type="button"
          disabled={status == "loading"}
          onClick={() => changeStep(1)}
          className="mt-2 btn btn-light talent-button"
        >
          {"<"} Back
        </button>
        <button
          type="button"
          disabled={status != "approved"}
          onClick={() => changeStep(3)}
          className="ml-2 mt-2 btn btn-primary talent-button"
        >
          Next {">"}{" "}
        </button>
      </div>
    </div>
  );
};

export default EmailValidation;
