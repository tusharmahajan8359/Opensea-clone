import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
const LowerPeiceModal = ({ handleClose, lowerPrice, show }) => {
  const newPrice = useRef();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Set the Lowered Price</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" placeholder="Enter the Amount" ref={newPrice} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => lowerPrice(newPrice.current.value)}
        >
          Show
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LowerPeiceModal;
