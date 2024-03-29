import React from 'react';
import { useParams } from 'react-router-dom';
import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

const DUMMY_CONTACTS = [
    {
      id: 'p1',
      title: 'Sarath K',
      description: 'Upcoming Associate Engineer !',
      imageUrl: sarathImage,
      phone: '7306162306',
      creator: 'u1'
    }
  ];

const UpdateContact = () => {
  const contactId = useParams().contactId;

  const identifiedContact = DUMMY_CONTACTS.find(p => p.id === contactId);

  if (!identifiedContact) {
    return (
      <div className="center">
        <h2>Could not find contact!</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedContact.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={() => {}}
        value={identifiedContact.description}
        valid={true}
      />
      <Input
        id="phone"
        element="input"
        label="Phone Number"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid phone number (at least 10)."
        onInput={() => {}}
        value={identifiedContact.phone}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE CONTACT
      </Button>
    </form>
  );
};

export default UpdateContact;