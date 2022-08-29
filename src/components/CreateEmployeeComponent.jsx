import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name_Emp: '',
            username: '',
            password: '',
            phone: '',
            address: '',
            line: '',
            slip: ''
        }
        this.changeName_EmpHandler = this.changeName_EmpHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.cchangeLineHandler = this.changeLineHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    name_Emp: employee.name_Emp,
                    username: employee.username,
                    password: employee.password,
                    phone : employee.phone,
                    address: employee.address,
                    line : employee.line,
                    slip: employee.slip
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {name_Emp: this.state.name_Emp,username: this.state.username,password: this.state.password,phone: this.state.phone,address:this.state.address,line: this.state.line,slip:this.state.slip};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeName_EmpHandler= (event) => {
        this.setState({name_Emp: event.target.value});
    }
    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }
   
    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }
    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }
    changeLineHandler= (event) => {
        this.setState({line: event.target.value});
    }
    changeSlipHandler= (event) => {
        this.setState({slip: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name </label>
                                            <input placeholder="Name" name="name_Emp" className="form-control" 
                                                value={this.state.name_Emp} onChange={this.changeName_EmpHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Username </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password </label>
                                            <input type='password' placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone </label>
                                            <input placeholder="Phone" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address </label>
                                            <input placeholder="Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Line </label>
                                            <input placeholder="Line" name="line" className="form-control" 
                                                value={this.state.line} onChange={this.changeLineHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Slip </label>
                                            <input placeholder="Slip" name="slip" className="form-control" 
                                                value={this.state.slip} onChange={this.changeSlipHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
