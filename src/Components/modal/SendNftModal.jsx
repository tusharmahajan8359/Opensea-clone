import React,{useRef} from 'react'
import {Button,Modal} from "react-bootstrap"
const SendNftModal = ({handleClose,sendNFT,show}) => {
  const sendaddress=useRef();
  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Send to</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          <input type="text" placeholder="enter receiver address" ref={sendaddress}/>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleClose(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={()=>sendNFT(sendaddress.current.value)}>
              Send NFT
            </Button>
          </Modal.Footer>
        </Modal>
  )
}

export default SendNftModal