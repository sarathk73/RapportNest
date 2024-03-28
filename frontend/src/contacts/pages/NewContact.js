import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewContact.css';

const NewContact = () => {
  return (
    <form className="contact-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
};

export default NewContact;