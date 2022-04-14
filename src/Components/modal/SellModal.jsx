import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
const SellModal = ({ handleClose, listForSale, show }) => {
  const selldata = useRef();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Set the Selling price</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FaEthereum size={28} />
        <input
          type="text"
          placeholder="Enter the Amount in ETH"
          ref={selldata}
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
          onClick={() => listForSale(selldata.current.value)}
        >
          Sell
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SellModal;
