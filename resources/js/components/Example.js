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
                id: "",
                name: "",
                description: ""
            }
        }
        // this.toggleNewTaskModal = this.toggleNewTaskModal.bind(this);
        this.toggleEditTaskModel = this.toggleEditTaskModel.bind(this)
        this.editTask = this.editTask.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
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
    // update task
    updateTask() {
        let {id, name, description} = this.state.editTaskData
        axios.put(
            "http://127.0.0.1:8000/api/task/" + id,
            {name, description}
            ).then(response => {
                this.loadData()
                this.setState({
                    editTaskData: { id:"", name: "", description: "" },
                    editTaskModel: false
            })
        })        
    }

    // delete task
    deleteTask() {
        let {id} = this.state.editTaskData
        axios.delete("http://127.0.0.1:8000/api/task/" + id).then(response => {
            this.loadData()
            this.setState({
                editTaskModal: false
            })
        })
    }


    //
    componentWillMount() {
        this.loadData();
    }

    // 
    toggleNewTaskModal() {
        console.log("new task")
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    }
    //
    toggleEditTaskModel() {
        console.log('edit task')
        this.setState(
            {editTaskModel: !this.state.editTaskModel}
        )
    }
    //
    editTask(id, name, description) {
        console.log(id)
        this.setState({
            editTaskData: {
                id, 
                name,
                description
            },
            editTaskModal: !this.state.editTaskModel
        })
    }


    render(){
        const tasks = this.state.tasks.map(task => {
            return (                
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button onClick = {() => {this.editTask(task.id, task.name, task.description)}} color="success" size="sm" className="mr-2" >Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                    </td>                    
                </tr>                
            );
        })

        return (
            <div className="container">
                {/* button to call the modal to add a task*/} 
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

                <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal}>
                        <ModalHeader toggle={this.toggleEditTaskModel}>{"Edit task"}</ModalHeader>
                        <ModalBody>                    
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input 
                                    id="name"
                                    value={this.state.editTaskData.name}
                                    onChange= {(e) => {                                                                
                                        let {editTaskData} = this.state;
                                        editTaskData.name = e.target.value;
                                        this.setState({editTaskData})                                
                                    }}
                                ></Input>
                            </FormGroup>                    
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input 
                                    id="description"
                                    value={this.state.editTaskData.description}
                                    onChange={e => {                                
                                        let {editTaskData} = this.state;
                                        editTaskData.description = e.target.value;
                                        this.setState({editTaskData});                                
                                    }}
                                ></Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateTask}>{"Edit Task"}</Button>{' '}
                            <Button color="secondary" onClick={this.deleteTask}>{"Delete"}</Button>
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
