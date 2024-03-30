import React,{useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import './ContactItem.css';

const ContactItem = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="contact-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this contact? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="contact-item">
        <Card className="contact-item__content">
          <div className="contact-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="contact-item__info">
            <h2>{props.title}</h2>
            <h3>{props.phone}</h3>
            <p>{props.description}</p>
          </div>
          <div className="contact-item__actions">
            <Button to={`/contacts/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ContactItem;