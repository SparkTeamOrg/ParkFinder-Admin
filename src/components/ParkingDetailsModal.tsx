import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface ParkingDetailsModalProps {
  parkingLot: any;
  onClose: () => void;
}

const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({ parkingLot, onClose }) => {
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Parking Lot Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{parkingLot.id}</td>
            </tr>
            <tr>
              <td>Street</td>
              <td>{parkingLot.road}</td>
            </tr>
            <tr>
                <td>City</td>
                <td>{parkingLot.city}</td>
            </tr>
            <tr>
                <td>County</td>
                <td>{parkingLot.county}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{parkingLot.state}</td>
            </tr>
            <tr>
              <td>Post Code</td>
              <td>{parkingLot.postCode}</td>
            </tr>
            <tr>
                <td>Country</td>
                <td>{parkingLot.country}</td>
            </tr>
            {/* Add more fields as needed */}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParkingDetailsModal;