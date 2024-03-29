import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewContact.css';

const NewContact = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const contactSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="contact-form" onSubmit={contactSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Name."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="phone"
        element="input"
        label="Phone Number"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid Number."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD CONTACT
      </Button>
    </form>
  );
};

export default NewContact;