import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
  VALIDATOR_MATCH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          image: undefined,
          dateOfBirth: undefined,
          gender: undefined,
          phoneNumbers: undefined,
          address: undefined,
          confirmPassword: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false
          },
          lastName: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          },
          dateOfBirth: {
            value: '',
            isValid: false
          },
          gender: {
            value: '',
            isValid: false
          },
          phoneNumbers: {
            value: '',
            isValid: false
          },
          address: {
            value: '',
            isValid: false
          },
          confirmPassword: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (!isLoginMode && formState.inputs.password.value !== formState.inputs.confirmPassword.value) {
      // Handle password mismatch error
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
        // Handle error
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('firstName', formState.inputs.firstName.value);
        formData.append('lastName', formState.inputs.lastName.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('dateOfBirth', formState.inputs.dateOfBirth.value);
        formData.append('gender', formState.inputs.gender.value);
        formData.append('phoneNumbers', JSON.stringify([formState.inputs.phoneNumbers.value])); // Send as JSON array
        formData.append('address', formState.inputs.address.value);

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
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
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your first name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lastName"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your last name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="dateOfBirth"
                type="date"
                label="Date of Birth"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid date of birth."
                onInput={inputHandler}
              />
              <div className="form-control">
                <label>Gender</label>
                <Input
                  element="radio"
                  id="gender"
                  name="gender"
                  type="radio"
                  label="Male"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please select your gender."
                  onInput={inputHandler}
                  value="male"
                />
                <Input
                  element="radio"
                  id="gender"
                  name="gender"
                  type="radio"
                  label="Female"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please select your gender."
                  onInput={inputHandler}
                  value="female"
                />
                <Input
                  element="radio"
                  id="gender"
                  name="gender"
                  type="radio"
                  label="Other"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please select your gender."
                  onInput={inputHandler}
                  value="other"
                />
              </div>
              <Input
                element="input"
                id="phoneNumbers"
                type="text"
                label="Phone Number"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
                errorText="Please enter a valid phone number."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="address"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your address."
                onInput={inputHandler}
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
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MATCH(formState.inputs.password.value)]}
              errorText="Passwords do not match."
              onInput={inputHandler}
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
