import React from 'react';
import { useParams } from 'react-router-dom';

//import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewContact.css';

const DUMMY_CONTACTS = [
    {
      id: 'p1',
      title: 'Sarath K',
      description: 'Upcoming Associate Engineer !',
      imageUrl: 'https://i.ibb.co/3yK7hXt/Whats-App-Image-2024-03-28-at-12-08-34-PM.jpg',
      phone: '7306162306',
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Akash  TK',
      description: 'Upcoming Software Engineer !',
      imageUrl: 'https://i.ibb.co/G3fDjLx/akash.png',
      phone: '8891101357',
      creator: 'u1'
    },
    {
      id: 'p3',
      title: 'Duyoof MP',
      description: 'Upcoming Software Engineer !',
      imageUrl: 'https://i.ibb.co/Ht6xdwd/doop.png',
      phone: '9562022595',
      creator: 'u1'
    }
  ];


const UpdateContact = () => {
  const contactId = useParams().contactId;

  const identifiedContact = DUMMY_CONTACTS.find(p => p.id === contactId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedContact.title,
        isValid: true
      },
      description: {
        value: identifiedContact.description,
        isValid: true
      },
      phone: {
        value: identifiedContact.phone,
        isValid: true
      }
    },
    true
  );

  const contactUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedContact) {
    return (
      <div className="center">
        <h2>Could not find contact!</h2>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={contactUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="phone"
        element="input"
        label="Phone Number"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid Number."
        onInput={inputHandler}
        initialValue={formState.inputs.phone.value}
        initialValid={formState.inputs.phone.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE CONTACT
      </Button>
    </form>
  );
};

export default UpdateContact;