import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
const SendNftModal = ({ handleClose, sendNFT, show }) => {
  const _recepient = useRef();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2> Send to</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="fs-3"
          placeholder="enter receiver address"
          ref={_recepient}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => sendNFT(_recepient.current.value)}
        >
          Send NFT
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendNftModal;
