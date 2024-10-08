import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_STRING} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import CountrySelector from '../../shared/components/FormElements/CountrySelector';


const NewContact = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [tags, setTags] = useState([]);

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
      },
      image: {
        value: null,
        isValid: true
      },
      tags: {
        value: [],
        isValid: true
      }
    },
    false
  );

  const history = useHistory();

  const handleTagsChange = (tags) => {
    setTags(tags);
    setFormData({
      ...formState.inputs,
      tags: {
        value: tags,
        isValid: true
      }
    }, true);
  };

  const contactSubmitHandler = async event => {
    event.preventDefault();
    const phoneNumberWithCode = `${selectedCountry}${formState.inputs.phone.value}`;
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('phone', phoneNumberWithCode);
      formData.append('image', formState.inputs.image.value);
      formData.append('tags', JSON.stringify(formState.inputs.tags.value));
      await sendRequest(process.env.REACT_APP_BACKEND_URL + '/contacts', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="auth-container">
        <h2>Add New Contact</h2>
        <form className="auth-form" onSubmit={contactSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="Full Name"
            validators={[VALIDATOR_REQUIRE(),VALIDATOR_STRING()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            className="auth-input"
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            className="auth-input"
          />
          <div className="phone-label-container">
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-container">
              <CountrySelector
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
              />
              <Input
                id="phone"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid Phone Number."
                onInput={inputHandler}
                className="auth-input"
              />
            </div>
          </div>
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
            className="auth-input"
          />
          <div className="auth-form-control">
            <label htmlFor="tags">Tags</label>
            <TagsInput value={tags} onChange={handleTagsChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button type="submit" disabled={!formState.isValid} className="auth-button">
              ADD CONTACT
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewContact;
