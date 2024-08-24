import React, { useState, useEffect ,useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './TagFilter.module.css';
import ContactList from '../components/ContactList';
import Pagination from '../../shared/components/UIElements/Pagination';
import { AuthContext } from '../../shared/context/auth-context';


const TagFilter = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/tags`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token,  
          }
        );
        setTags(responseData.tags);
      } catch (err) {}
    };
    fetchTags();
  }, [sendRequest, auth.token]);

  useEffect(() => {
    const fetchContactsByTag = async () => {
      if (selectedTag) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/contacts/tag/${selectedTag}?page=${currentPage}`,
            'GET',
            null,
            {
              Authorization: 'Bearer ' + auth.token,  
            }
          );
          setLoadedContacts(responseData.contacts);
          setTotalPages(responseData.totalPages);
        } catch (err) {}
      }
    };
    fetchContactsByTag();
  }, [sendRequest, selectedTag, currentPage,auth.token]);

  const selectTagHandler = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className={styles.tagFilterContainer}>
        <h2>Filter by Tags</h2>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button key={tag.name} onClick={() => selectTagHandler(tag.name)}>
              {tag.name} ({tag.count})
            </button>
          ))}
        </div>
        {!isLoading && selectedTag && loadedContacts && (
          <div className={styles.contactsContainer}>
            <ContactList items={loadedContacts} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TagFilter;
