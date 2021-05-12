import React, { Component } from 'react';
import {connect} from 'react-redux';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:props.auth.user.name,
            password:'',
            confirmPassword:'',
            editMode:false,
        };
    }
    handleChange=(fieldName,val)=>{
        this.setState({
            [fieldName]: val
        })
    }
    changeMode=()=>{
        this.setState({
            editMode:!this.state.editMode
        });
    }
    render() {
        const {user}=this.props.auth;
        const editMode=this.state.editMode;
        return (
            <div className="settings">
                <div className="img-container">
                    <img src="https://www.flaticon.com/premium-icon/icons/svg/666/666201.svg" alt="dp" />
                    <div className="update-dp">Update Picture</div> 
                </div>
                <div className="field">
                    <div className="field-label">Email</div>
                    <div className="field-value">{user.email}</div>
                </div>
                <div className="field">
                    <div className="field-label">Name</div>
                    {editMode
                        ?<input type="text" onChange={(e)=>this.handleChange('name',e.target.value)} value={this.state.name}/> 
                        :<div className="field-value">{user.name}</div>
                    }
                    {editMode &&
                        <div className="field">
                            <div className="field-label">New Password</div>
                            <input type="password" onChange={(e)=>this.handleChange('password',e.target.value)} value={this.state.password}/> 
                            <div className="field-label">Confirm Password</div>
                            <input type="password" onChange={(e)=>this.handleChange('confirmPassword',e.target.value)} value={this.state.confirmPassword}/> 
                        </div>
                    }
                    <div class="btn-grp">
                        {editMode &&        
                            <button className="button go-back" onClick={()=>this.changeMode()}>Back</button>
                        }
                        {editMode
                            ?<button className="button save-btn">Save</button>
                            :<button className="button edit-btn" onClick={()=>this.changeMode()}>Edit</button>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(Settings);