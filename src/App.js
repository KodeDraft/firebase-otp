import React, { useState, useEffect } from "react";
import { authentication } from "./firebase";
import OtpInput from "react-otp-input";
// import { getAuth } from "firebase/auth";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
// CSS
import "./style.css";

// MAIN
export default function App() {
  // COUNTRY CODE
  const countryCode = "+91";
  // PHONE NUMBER STATE
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpanForm] = useState(false);
  // OTP
  const [otp, setOtp] = useState();
  let confirmationResult = window.confirmationResult;

  // GENERATING RE CAPTCHA
  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };
  // SENDING OTP VIA SMS
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpanForm(true);
      generateReCaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP SENT");
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error.code);
        });
    }
  };
  // SETTING OTP
  const handleChange = (otp) => {
    setOtp(otp);
  };
  const verifyOtp = (e) => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        const userEmail = result.user.email;
        console.log(user);
        alert("Logged In!");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
      });
  };
  // JSK
  return (
    <div>
      <img
        src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png"
        id="titleImg"
      />
      <form onSubmit={requestOTP}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone-number"
          name="phone"
          placeholder="Enter Phone Number"
          className="input"
          onChange={(event) => setPhoneNumber(event.target.value)}
          value={phoneNumber}
        />

        {/* SHOWING THE OTP INPUT */}
        {expandForm === true ? (
          <>
            <label htmlFor="lname">ENTER OTP</label>
            <div className="otp-input">
              <OtpInput
                value={otp}
                name="otp"
                onChange={(event) => handleChange(event)}
                numInputs={6}
                shouldAutoFocus={true}
              />
              <button className="btn" onClick={verifyOtp}>
                Verify
              </button>
            </div>
          </>
        ) : null}
        {expandForm === false ? <input type="submit" value="Submit" /> : null}

        <div id="recapcha-container"></div>
      </form>
    </div>
  );
}
