import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ModalProps {
  parkingZones: any[];
  onSelect: (zone: any) => void;
  onClose: (selected?: boolean) => void;
}

const ParkingZoneModal: React.FC<ModalProps> = ({ parkingZones, onSelect, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const handleSelect = () => {
    if (selectedZone) {
      onSelect(selectedZone);
      onClose(true); // Pass true to indicate a selection was made
    } else {
      alert("Please select a zone");
    }
  };

  return (
    <Modal show onHide={() => onClose(false)}> {/* Pass false to indicate no selection */}
      <Modal.Header closeButton>
        <Modal.Title>Select Parking Zone</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="parkingZoneSelect">
            <Form.Label>Parking Zone</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedZone(parkingZones.find(zone => zone.id === Number.parseInt(e.target.value)))}
            >
              <option value="">Select a zone...</option>
              {(Array.isArray(parkingZones) ? parkingZones : []).map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}> {/* Pass false to indicate no selection */}
          Close
        </Button>
        <Button variant="primary" onClick={handleSelect}>
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParkingZoneModal;