import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserContacts = () => {
  const [loadedContacts, setLoadedContacts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/contacts/user/${userId}`
        );
        setLoadedContacts(responseData.contacts);
      } catch (err) {}
    };
    fetchContacts();
  }, [sendRequest, userId]);

  const contactDeletedHandler = deletedContactId => {
    setLoadedContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deletedContactId)
    );
  };
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContacts && (
        <ContactList items={loadedContacts} onDeleteContact={contactDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserContacts;