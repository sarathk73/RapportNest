import React, { useState , useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ContactList from '../components/ContactList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import TagFilter from './TagFilter';
import { AuthContext } from '../../shared/context/auth-context';


const FilteredContacts = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContactsByTag = async (tag, page = 1) => {
    console.log(`Fetching contacts for tag: ${tag}, page: ${page}`);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/tag/${tag}?page=${page}`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + auth.token  
        }
      );
      console.log('Contacts fetched:', responseData.contacts);
      setLoadedContacts(responseData.contacts);
      setTotalPages(responseData.totalPages);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    }
  };

  const handleTagSelect = (tag) => {
    setCurrentPage(1);
    fetchContactsByTag(tag, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchContactsByTag(selectedTag, page);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className={styles.container}>
        <TagFilter onSelectTag={handleTagSelect} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedContacts.length > 0 && (
          <div className={styles.contactsContainer}>
            <ContactList items={loadedContacts} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FilteredContacts;
