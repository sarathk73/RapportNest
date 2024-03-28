import React from 'react';

import './NewContact.css';

const NewContact = () => {
  return (
    <form className="contact-form">
      <Input type="text" label="Title" />
    </form>
  );
};

export default NewContact;