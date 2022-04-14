import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
const LowerPeiceModal = ({ handleClose, lowerPrice, show }) => {
  const newPrice = useRef();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Set the Lowered Price</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FaEthereum size={28} />
        <input
          type="text"
          placeholder="Enter the Amount"
          ref={newPrice}
          className="fs-3 "
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => handleClose(false)}
        >
          Close
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => lowerPrice(newPrice.current.value)}
        >
          Show
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LowerPeiceModal;
