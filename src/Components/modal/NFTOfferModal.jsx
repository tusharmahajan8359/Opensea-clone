import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
const NFTOfferModal = ({ handleClose, offer, show }) => {
  const offerdata = useRef();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Set Offer price</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FaEthereum size={28} />
        <input
          type="text"
          placeholder="Enter the Amount in ETH"
          ref={offerdata}
          className="fs-3"
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
          onClick={() => offer(offerdata.current.value)}
        >
          Push Offer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NFTOfferModal;
