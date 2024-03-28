import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewContact.css';

const NewContact = () => {
  return (
    <form className="contact-form">
      <Input element="input" type="text" label="Title"  validators={[]} errorText="Please enter a valid title." />
    </form>
  );
};

export default NewContact;