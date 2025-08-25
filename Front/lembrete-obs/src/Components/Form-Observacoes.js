import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FaPlus } from "react-icons/fa";


function GridAutoSizingExample({ onAdd, dataToSend, setDataToSend}) {
  
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarregar a página
    if (!dataToSend.trim()) {
      setError("O lembrete não pode estar vazio");
      return;
    }
    onAdd(dataToSend);
    setDataToSend("");
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-end">
        <Col xs="10" className='d-flex justify-content-between'>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Lembrete
          </Form.Label>
          <InputGroup className="mb-0">
            <Form.Control
              
              id="inlineFormInputGroup"
              placeholder="Lembrete"
              type="text"
              value={dataToSend}
              onChange={(e) => setDataToSend(e.target.value)}
            />
          </InputGroup>
          <Button type="submit" className='ms-2'>
            <FaPlus />
          </Button>
        </Col>
          {error && <small className="text-danger">{error}</small>}
      </Row>
    </Form>
  );
}

export default GridAutoSizingExample;
