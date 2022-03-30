import React,{useRef} from 'react'
import {Button,Modal} from "react-bootstrap"
const SellModal = ({handleClose,listForSale,show}) => {
  const selldata=useRef();
  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Sell Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          <input type="text" placeholder="enter" ref={selldata}/>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleClose(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>listForSale(selldata.current.value)}>
             Sell
            </Button>
          </Modal.Footer>
        </Modal>
  )
}

export default SellModal