import React from "react";
import {
    Table, 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from 'reactstrap';


export default function TaskModal(props) {
    return (
        <Modal isOpen={props.newTaskModal} toggle={props.toggleNewTaskModal}>
                <ModalHeader toggle={props.toggleNewTaskModal}>{"Add new task"}</ModalHeader>
                <ModalBody>                    
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            id="name"
                            value={""}
                            onChange= {(e) => {
                                console.log("changed...")
                                /*
                                let {newTaskData} = this.state;
                                newTaskData.name = e.target.value;
                                this.setState({newTaskData})
                                */
                            }}
                        ></Input>
                    </FormGroup>                    
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input 
                            id="description"
                            value={""}
                            onChange={e => {
                                /*
                                let {newTaskData} = this.state;
                                newTaskData.description = e.target.value;
                                this.setState({newTaskData});
                                */
                            }}
                        ></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={console.log("task added ..")}>{"Add Task"}</Button>{' '}
                    <Button color="secondary" onClick={null}>{"Cancel"}</Button>
                </ModalFooter>
                </Modal>
    )
}