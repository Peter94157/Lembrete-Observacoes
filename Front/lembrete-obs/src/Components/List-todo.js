import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FaEdit, FaCheck } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function TabsExample({ lembrete }) {
    const itens = Array.isArray(lembrete) ? lembrete : Object.values(lembrete ?? {});
    const [doneItems, setDoneItems] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [obs, setObs] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleCheck = (id) => {
        setDoneItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleEdit = async (item) => {
        console.log("contador:", item.contador)
        setSelectedItem(item);
        setShowModal(true);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/lembretes/${item.contador}/observacoes`);
            const data = await res.json();

            setObs(data[0]?.texto || "");

        } catch (err) {
            console.error("Erro ao buscar observação:", err);
            setObs("Erro ao carregar observação");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setObs("");
    };

    const handleSave = async () => {
        if (!selectedItem) {
            console.log(selectedItem);
            return
        }

        console.log("obsID", obs);
        setSaving(true);
        try {
            await fetch(`http://localhost:5000/lembretes/${selectedItem.contador}/observacoes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ texto: obs })
            });
            setShowModal(false); // fecha modal ao salvar
        } catch (err) {
            console.error("Erro ao salvar observação:", err);
        } finally {
            setSaving(false);
        }
    };

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

            {/* Modal de observação */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Observação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Carregando observação...</p>
                    ) : (
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Texto da observação</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={obs}
                                            onChange={(e) => setObs(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Salvando..." : "Salvar"}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TabsExample;
