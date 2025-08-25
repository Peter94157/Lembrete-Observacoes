import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FaEdit, FaCheck } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function TabsExample({ lembrete }) {
    const itens = Array.isArray(lembrete) ? lembrete : Object.values(lembrete ?? {});
    const [doneItems, setDoneItems] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCheck = (id) => {
        setDoneItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Tab.Container id="list-group" defaultActiveKey="#link1">
                <Row>
                    <Col sm={10}>
                        <ListGroup>
                            {Object.values(itens).map((task, i) => {
                                const isDone = doneItems[task.contador] || false;

                                return (
                                    <ListGroup.Item
                                        key={i}
                                        action
                                        href={`#link${task.contador}`}
                                        className={`d-flex justify-content-between ${isDone ? "text-decoration-line-through text-muted" : ""}`}
                                    >
                                        {task.texto}
                                        <div>
                                            <Button
                                                variant={isDone ? "dark" : "outline-dark"}
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleCheck(task.contador)}
                                            >
                                                <FaCheck color={isDone ? "white" : "black"} />
                                            </Button>

                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                                disabled={isDone}
                                                onClick={() => handleEdit(task)}
                                            >
                                                <FaEdit />
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Tab.Container>

            {/* Modal/Card de observação */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Observação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>Lembrete #{selectedItem?.contador}</Card.Title>
                            <Card.Text>{selectedItem?.texto}</Card.Text>
                            {/* Aqui você pode adicionar um campo para editar a observação */}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TabsExample;
