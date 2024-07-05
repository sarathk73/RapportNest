import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewContact.css';

const UpdateContact = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContact, setLoadedContact] = useState();
  const contactId = useParams().contactId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/contacts/${contactId}`
        );
        setLoadedContact(responseData.contact);
        setFormData(
          {
            title: {
              value: responseData.contact.title,
              isValid: true
            },
            description: {
              value: responseData.contact.description,
              isValid: true
            },
            phone: {
              value: responseData.contact.phone,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchContact();
  }, [sendRequest, contactId, setFormData]);

  const contactUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/contacts/${contactId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          phone: formState.inputs.phone.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/contacts');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedContact && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find contact!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedContact && (
        <form className="contact-form" onSubmit={contactUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedContact.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedContact.description}
            initialValid={true}
          />
          <Input
            id="phone"
            element="input"
            type="text"
            label="Phone"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid Phone Number."
            onInput={inputHandler}
            initialValue={loadedContact.phone}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE CONTACT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateContact;