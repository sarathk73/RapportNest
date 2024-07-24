import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Pagination from '../../shared/components/UIElements/Pagination';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserContacts = () => {
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/user/${userId}/paginated?page=${currentPage}`
        );
        setLoadedContacts(responseData.contacts);
        setTotalPages(responseData.totalPages);
      } catch (err) {}
    };
    fetchContacts();
  }, [sendRequest, userId, currentPage]);

  const contactDeletedHandler = deletedContactId => {
    setLoadedContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deletedContactId)
    );
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
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
        <>
          <ContactList items={loadedContacts} onDeleteContact={contactDeletedHandler} isSearchResult={false} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={pageChangeHandler}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default UserContacts;
