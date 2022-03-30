import React from 'react'
import {Button,Modal} from "react-bootstrap"
const LowerPeiceModal = ({handleClose,listForSale,show}) => {
  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Lower Price Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleClose(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>handleClose(false)}>
             Show
            </Button>
          </Modal.Footer>
        </Modal>
  )
}



export default LowerPeiceModal;