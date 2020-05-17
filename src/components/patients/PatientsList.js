import React, {Component} from "react";
import url from "../../url";
import Pagination from "react-js-pagination";

class PatientsList extends Component {

    showUsers = () => {
        const users_list = this.props.users;
        if (users_list.length === 0) {
            return (
                <React.Fragment>
                    <h1>NO HAY DATOS PARA MOSTRAR</h1>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <table className="table table-striped custom-table">
                    <thead>
                    <tr>
                        <th className="text-left" style={{width: '200px'}}>Nombre</th>
                        <th style={{width: '80px'}}>N° Cédula</th>
                        <th style={{width: '60px'}}>Edad</th>
                        <th  className="text-left" >Dirección</th>
                        <th className="text-left" style={{width: '200px'}}>Correo</th>
                        <th style={{width: '100px'}}>Télefono</th>


                        <th style={{width: '50px'}} className="text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users_list.map((user) => (
                        <tr key={user.id}>
                            <td className="text-left">
                                <img width="28" height="28"
                                     src={user.url_image === "#" ? "assets/img/user.jpg" : `${url}/${user.url_image}`}
                                     className="rounded-circle" alt=""/>
                                <h2> {user.name} {user.last_name}</h2>
                            </td>
                            <td>{user.ci}</td>
                            <td>{user.birth_date ===""?"":this.props.agePatient(user.birth_date)}</td>
                            <td className="text-left">{user.address+" - "+user.city+" - "+user.province}</td>
                            <td className="text-left">{user.email}</td>
                            <td>{user.phone}</td>



                            <td className="text-right">
                                <div className="dropdown dropdown-action">
                                    <a href="#" className="action-icon dropdown-toggle"
                                       data-toggle="dropdown"
                                       aria-expanded="false">
                                        <i className="fa fa-ellipsis-v">
                                        </i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button className="dropdown-item"
                                           onClick={(e)=>this.props.dataEditUser(user)}
                                           data-toggle="modal"
                                           data-target="#add_group">
                                            <i className="fa fa-pencil m-r-5"></i>
                                            Edit
                                        </button>
                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                           onClick={(e) => this.props.onSelectedDeleteUser(user)}
                                           data-target="#delete_patient">
                                            <i className="fa fa-trash-o m-r-5"></i>
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                {this.showUsers()}
            </React.Fragment>
        );
    }
}

export default PatientsList;