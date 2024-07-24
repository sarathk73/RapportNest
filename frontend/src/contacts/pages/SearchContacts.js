import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ContactList from '../components/ContactList';
import Pagination from '../../shared/components/UIElements/Pagination';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './SearchContacts.module.css';

const SearchContacts = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchHandler = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setSearchError('Please enter a search term.');
      return;
    }
    setSearchInitiated(true);
    setSearchError(null);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/search?name=${searchTerm}&page=${currentPage}`
      );
      setLoadedContacts(responseData.contacts);
      setTotalPages(responseData.totalPages);
    } catch (err) {}
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
    setSearchInitiated(true);
  };

  useEffect(() => {
    if (searchInitiated) {
      searchHandler({ preventDefault: () => {} });
    }
  }, [currentPage]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ErrorModal error={searchError} onClear={() => setSearchError(null)} />
      <form className={styles.searchBar} onSubmit={searchHandler}>
        <label htmlFor="search">Search for contacts</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          required
        />
        <button type="submit">Go</button>
      </form>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContacts && (
        <div className={styles.contactsContainer}>
          <ContactList items={loadedContacts} searchInitiated={searchInitiated} isSearchResult={true} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={pageChangeHandler}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchContacts;
