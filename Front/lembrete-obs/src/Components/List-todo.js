import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';



function TabsExample({ lembrete }) {
    
    const itens = Array.isArray(lembrete) ? lembrete : Object.values(lembrete ?? {});
    return <>
        <Tab.Container id="list-group" defaultActiveKey="#link1">
            <Row>
                <Col sm={10}>
                    <ListGroup>
                        {Object.values(itens).map((task, i) => (
                            <ListGroup.Item className='d-flex justify-content-between' action href={`#link${task.contador}`} key={i}>
                                {task.texto}
                                <Button variant='outline-dark' size='sm'>
                                <FaEdit/>
                                </Button>
                            </ListGroup.Item>

                        ))}

                    </ListGroup>
                </Col>

            </Row>
        </Tab.Container>
    </>;
}

export default TabsExample;