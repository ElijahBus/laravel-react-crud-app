import React from 'react';
import ReactDOM from 'react-dom';
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
import axios from 'axios';

import Task from './TaskModal';
import TaskModal from './TaskModal';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            newTaskModal: false,
            newTaskData: {
                name: "",
                description: ""
            },
            editTaskModel: false,
            editTaskData: {
                name: "",
                description: ""
            }
        }
        this.toggleNewTaskModal = this.toggleNewTaskModal.bind(this);
    }

    //
    // load data from the api
    loadData() {
        axios.get("http://127.0.0.1:8000/api/tasks").then(response => {
            this.setState(
                {tasks: response.data}
            )
        })
    }
    // add a task
    addTask() {
        axios.post("http://127.0.0.1:8000/api/task", this.state.newTaskData).then(respnse => {
            let {tasks} = this.state;

            this.setState({
                tasks,
                newTaskModal: false,
                newTaskData: {name: "", description: ""}
            })
        })
    }
    // edit task
    editTask(id, name, desciption) {
        this.setState({
            editTaskData: {
                id,name, desciption
            },
            editTaskModel: !this.state.editTaskModel
        })
    }


    //
    componentWillMount() {
        this.loadData();
    }

    // 
    toggleNewTaskModal() {
        console.log("nerw task")
        this.setState({
            newTaskModal: true
        })
    }
    //
    toggleEditTaskModel() {
        this.setState(
            {editTaskModel: !this.state.editTaskData}
        )
    }


    render(){
        const tasks = this.state.tasks.map(task => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                    </td>
                </tr>
            );
        })

        return (
            <div className="container">
                {/* button to call the modal */} 
                <Button color="primary" onClick={() => {this.toggleNewTaskModal()}}>{"Add Task"}</Button>
                
                <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>{"Add new task"}</ModalHeader>
                <ModalBody>                    
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            id="name"
                            value={this.state.newTaskData.name}
                            onChange= {(e) => {                                                                
                                let {newTaskData} = this.state;
                                newTaskData.name = e.target.value;
                                this.setState({newTaskData})                                
                            }}
                        ></Input>
                    </FormGroup>                    
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input 
                            id="description"
                            value={this.state.newTaskData.description}
                            onChange={e => {                                
                                let {newTaskData} = this.state;
                                newTaskData.description = e.target.value;
                                this.setState({newTaskData});                                
                            }}
                        ></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addTask.bind(this)}>{"Add Task"}</Button>{' '}
                    <Button color="secondary" onClick={null}>{"Cancel"}</Button>
                </ModalFooter>
                </Modal>

                {/*------------------- */}   
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                         {/* displaying table data */}
                        {tasks}    
                    </tbody>
                </Table>
            </div>
        );
    }
}


if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
