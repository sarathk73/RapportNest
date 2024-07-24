import React, { useState, useContext, useEffect, useCallback } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MATCH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import CountrySelector from '../../shared/components/FormElements/CountrySelector';
import SignInButton from '../../shared/components/FormElements/SignInButton';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isEmailVerificationButtonVisible, setIsEmailVerificationButtonVisible] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState('');
  const [isEmailVerificationLogin, setIsEmailVerificationLogin] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      confirmPassword: {
        value: '',
        isValid: false
      },
      phoneNumbers: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    if (isLoginMode) {
      setFormData(
        {
          email: formState.inputs.email,
          password: formState.inputs.password
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: { value: '', isValid: false },
          lastName: { value: '', isValid: false },
          image: { value: null, isValid: false },
          dateOfBirth: { value: '', isValid: false },
          gender: { value: '', isValid: false },
          phoneNumbers: { value: '', isValid: false },
          address: { value: '', isValid: false },
          confirmPassword: { value: '', isValid: false }
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
  }, [isLoginMode, setFormData]);

  const switchModeHandler = event => {
    event.preventDefault();
    clearError();
    setIsLoginMode(prevMode => !prevMode);
    setShowForgotPassword(false);
    setIsEmailVerificationButtonVisible(true);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (!isLoginMode && formState.inputs.password.value !== formState.inputs.confirmPassword?.value) {
      console.log("Password Mismatch");
      return;
    }

    const phoneNumberWithCode = `${selectedCountry}${formState.inputs.phoneNumbers?.value || ''}`;

    if (!isLoginMode && phoneNumberWithCode !== verifiedPhoneNumber) {
      setVerificationMessage('Phone numbers do not match. Please verify the phone number.');
      return;
    }

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.error("Login Error: ", err.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('firstName', formState.inputs.firstName?.value || '');
        formData.append('lastName', formState.inputs.lastName?.value || '');
        formData.append('image', formState.inputs.image?.value || '');
        formData.append('dateOfBirth', formState.inputs.dateOfBirth?.value || '');
        formData.append('gender', formState.inputs.gender?.value || '');
        formData.append('phoneNumbers', JSON.stringify([phoneNumberWithCode]));
        formData.append('address', formState.inputs.address?.value || '');

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.error("Signup Error: ", err.message);
      }
    }
  };

  const handlePhoneVerification = useCallback((verifiedPhone) => {
    setPhoneVerified(true);
    setVerifiedPhoneNumber(verifiedPhone);
    setVerificationMessage('Phone number verified successfully.');
  }, []);

  const handleEmailVerification = useCallback(async (userObj) => {
    setEmailVerified(true);
    setVerificationMessage('Email verification successful. Please check your email for the verification link.');
    setIsEmailVerificationButtonVisible(false);
    setIsEmailVerificationLogin(true);
  
    const user_json_url = userObj.user_json_url;
    try {
      const response = await fetch(user_json_url);
      const data = await response.json();
      console.log('Email Verification Data:', data); 
  
      // Access the correct field name
      if (data.user_email_id) {
        const email = data.user_email_id;
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/email-verify-login',
          'POST',
          JSON.stringify({ email }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token);
      } else {
        throw new Error('Email not found in verification data');
      }
    } catch (err) {
      console.error('Email Verification Login Error:', err.message);
      setVerificationMessage(err.message || 'An error occurred during email verification login.');
    }
  }, [sendRequest, auth]);
  
  
  const forgotPasswordHandler = () => {
    setShowForgotPassword(true);
  };

  useEffect(() => {
    if (showForgotPassword) {
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/verify_email_v1.js';
      script.async = true;
      document.body.appendChild(script);

      window.phoneEmailReceiver = (userObj) => {
        handleEmailVerification(userObj);
      };

      return () => {
        document.body.removeChild(script);
        delete window.phoneEmailReceiver;
      };
    }
  }, [showForgotPassword, handleEmailVerification]);

  return (
    <React.Fragment>
      <ErrorModal
        error={error || verificationMessage}
        header={verificationMessage ? "Verification Decision" : "An Error Occurred!"}
        onClear={() => { clearError(); setVerificationMessage(''); }}
      />
      <div className={`auth-container ${isLoginMode ? 'auth-login-mode' : 'auth-signup-mode'}`}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login Required' : 'Signup Required'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="firstName"
                type="text"
                placeholder="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your first name."
                onInput={inputHandler}
                className="auth-input"
              />
              <Input
                element="input"
                id="lastName"
                type="text"
                placeholder="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your last name."
                onInput={inputHandler}
                className="auth-input"
              />
              <Input
                element="input"
                id="dateOfBirth"
                label="Date Of Birth"
                type="date"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid date of birth."
                onInput={inputHandler}
                className="auth-input"
              />
              <div className="gender-container">
                <Input
                  element="select"
                  id="gender"
                  label="Gender"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please select your gender."
                  onInput={inputHandler}
                  className="auth-input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Input>
              </div>
              <div className="phone-container">
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                />
                <Input
                  element="input"
                  id="phoneNumbers"
                  type="text"
                  placeholder="Phone Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid phone number."
                  onInput={inputHandler}
                  className="auth-input"
                />
              </div>
              {!phoneVerified && (
                <div className="auth-button-container">
                  <SignInButton onPhoneVerified={handlePhoneVerification} />
                </div>
              )}
              <Input
                element="input"
                id="address"
                type="text"
                placeholder="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your address."
                onInput={inputHandler}
                className="auth-input"
              />
              <ImageUpload
                center
                id="image"
                onInput={inputHandler}
                errorText="Please provide an image."
              />
            </>
          )}
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            className="auth-input"
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
            className="auth-input"
          />
          {isLoginMode && (
            <div className="forgot-password">
              <a href="#" onClick={forgotPasswordHandler}>Forgot Password?</a>
            </div>
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MATCH(formState.inputs.password.value)]}
              errorText="Passwords do not match."
              onInput={inputHandler}
              className="auth-input"
            />
          )}
          {showForgotPassword && isEmailVerificationButtonVisible && (
            <div className="auth-button-container">
              <div className="pe_verify_email" data-client-id="14724806876563276160"></div>
            </div>
          )}
          <div className="auth-buttons">
            <Button
              type="submit"
              disabled={!formState.isValid || (!isLoginMode && !phoneVerified) || (isLoginMode && showForgotPassword && !emailVerified && !isEmailVerificationLogin)}
              className="auth-button"
            >
              {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
            <Button inverse onClick={switchModeHandler} type="button" className="auth-button">
              SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
