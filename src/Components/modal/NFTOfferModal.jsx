import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
const NFTOfferModal = ({ handleClose, offer, show }) => {
    const offerdata = useRef();
    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title> Set Offer price</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" placeholder="Enter the Amount in ETH" ref={offerdata} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => offer(offerdata.current.value)}
                >
                    Push Offer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NFTOfferModal;