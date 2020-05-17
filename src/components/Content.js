import React, {Component} from 'react';
import url from '../url';
import Axios from 'axios';
import Pagination from "react-js-pagination";


export default class Content extends Component {
    constructor(props) {
        super(props)
        ///ELEMENTOS QUE SE MANEJARAN LOS ESTADOS
        this.state = {
            //variables de la paginacion
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,

            //variables del sistema
            users: [],
            backupUsers: [],
            textBuscar: '',
            roles: [],
            errors: {
                er_name: '',
                er_email: '',
                er_ci: '',
                er_last_name: '',
                er_username: '',
                er_birth_date: '',
                er_gender: '',
                er_address: '',
                er_province: '',
                er_city: '',
                er_phone: '',
                er_url_image: '',
                er_status: ''
            },
            form: {
                id: 0,
                name: '',
                email: '',
                ci: '',
                last_name: '',
                username: '',
                birth_date: '',
                gender: 'masculino',
                address: '',
                province: '',
                city: '',
                phone: '',
                url_image: '',
                status: 'activo',
                rol: 1
            }
        }
        //BINDING PARA LOS METODOS
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetErrors = this.resetErrors.bind(this)
        this.onValueChangeGender = this.onValueChangeGender.bind(this)
        this.onValueChangeActive = this.onValueChangeActive.bind(this)
        this.getOne = this.getOne.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onSelectedDeleteUser = this.onSelectedDeleteUser.bind(this)
        this.filter = this.filter.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.onChangeInputFile = this.onChangeInputFile.bind(this)
        this.createImage = this.createImage.bind(this)
        this.resetPagination = this.resetPagination.bind(this)
    }


    //REALIZA LA CONSULTA PARA ACTUALIZAR LOS ESTADOS PAAR LISTA DE USUARIOS Y PARA EL ESTADO DEL FORMULACRIO
    async componentDidMount() {
        try {
            let res = await fetch(`${url}/api/api-get-users`)
            let data = await res.json()
            this.setState({
                users: data.users.data,
                backupUsers: data.users.data,
                roles: data.roles,
                itemsCountPerPage: data.users.per_page,
                totalItemsCount: data.users.total,
            })

        } catch (e) {


        }
    }

    //CALCULO DE LA EDAD MEDIANTE EL CAMPO birth_date del usuario
    agePatient = (birh_date)=>{
        const age =  Math.floor((new Date() - new Date(birh_date).getTime()) / 3.15576e+10)
        console.log(age)
    }

    ///METODO RESETEA LOS ESTADOS DE LA PAGINACION
    resetPagination(){
        this.setState({
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
        })
    }
    //METODO PARA CAMBIAR EL ESTADO DE RADIO BUTTON GENDER
    onValueChangeActive(event) {
        this.setState({
            form: {
                ...this.state.form,
                status: event.target.value,
            }
        });

    }

    //METODO PARA CAMBIAR EL ESTADO DE RADIO BUTTON STATUS
    onValueChangeGender(event) {
        this.setState({
            form: {
                ...this.state.form,
                gender: event.target.value
            }
        });

    }

    ///METODO PARA ESCUCHAR LOS CAMBIOS EN EL FORMULARIO
    handleChange(e) {
        //actualiza el estado del form
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    ///metodo para el submit
    async handleSubmit(e) {
        //evento para que no recargue la pagina
        e.preventDefault()
        try {
            if (this.state.form.id == 0) {
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.form)
                }
                let res = await fetch(`${url}/api/api-store-user`, config)
                let data = await res.json()
                //actualiza el estado nuevo
                if (res.status == 200 && res.ok == true) {
                    this.resetPagination()
                    this.componentDidMount()
                    this.resetErrors()
                } else {
                    this.changeErrors(data)
                }
            } else {
                let config = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.form)
                }
                let res = await fetch(`${url}/api/api-put-user/${this.state.form.id}`, config)
                let data = await res.json()
                //actualiza el estado nuevo
                if (res.status == 200 && res.ok == true) {
                    this.resetPagination()
                    this.componentDidMount()
                    this.resetErrors()
                } else {
                    this.changeErrors(data)
                }
            }
        } catch (e) {
            this.setState({
                // error
            })
        }
    }

    //METODO QUE SELECIONA UN USUARIO PARA SER ELIMINADO
    onSelectedDeleteUser(user) {
        this.setState({
            form: {
                ...this.state.form,
                id: user.id
            }
        })
    }

    //METODO PARA ELIMINAR UN USUARIO MEDIANTE AXIOS
    onDelete(id) {
        Axios.delete(`${url}/api/api-delete-user/${id}`)
            .then((res) => {
                this.resetPagination()
                this.componentDidMount()
                this.resetErrors()
            })
    }

    ///METODO PARA LLENAR EL FORMULARIO UN UN USUARIO SELECCIONADO
    getOne(user) {
        let role = 0
        user.roles.map((rol) => (
            role = rol.id
        ))

        this.setState({
            form: {
                ...this.state.form,
                id: user.id,
                name: user.name,
                email: user.email,
                ci: user.ci,
                last_name: user.last_name,
                username: user.username,
                birth_date: user.birth_date,
                gender: user.gender,
                address: user.address,
                province: user.province,
                city: user.city,
                phone: user.phone,
                url_image: user.url_image,
                status: user.status,
                rol: role
            }
        })
    }

    //ESCUCHAR LOS ESTADOS DE LOS ERRORES
    changeErrors(data) {
        this.setState({
            errors: {
                ...this.state.errors,
                er_name: data.errors.name,
                er_email: data.errors.email,
                er_ci: data.errors.ci,
                er_last_name: data.errors.last_name,
                er_username: data.errors.username,
                er_birth_date: data.errors.birth_date,
                er_gender: data.errors.gender,
                er_address: data.errors.address,
                er_province: data.errors.province,
                er_city: data.errors.city,
                er_phone: data.errors.phone,
                er_url_image: data.errors.url_image,
                er_status: data.errors.status
            }

        })
    }

///RESTBLECER TODOS LOS ESTADOS POR DEFECTO
    resetErrors() {
        this.setState({
            errors: {
                ...this.state.errors,
                id: 0,
                er_name: '',
                er_email: '',
                er_ci: '',
                er_last_name: '',
                er_username: '',
                er_birth_date: '',
                er_gender: '',
                er_address: '',
                er_province: '',
                er_city: '',
                er_phone: '',
                er_url_image: '',
                er_status: ''
            },
            form: {
                ...this.state.form,
                id: 0,
                name: '',
                email: '',
                ci: '',
                last_name: '',
                username: '',
                birth_date: '',
                gender: 'masculino',
                address: '',
                province: '',
                city: '',
                phone: '',
                url_image: '',
                status: 'activo',
                rol: 1
            }
        })
    }

///METODO PARA FILTRAR LAS BUSQUEDAS

    filter(event) {
        let text = event.target.value
        const data = this.state.backupUsers
        const newData = data.filter(function (item) {
            const itemCi = item.ci.toUpperCase()
            const itemName = item.name.toUpperCase()
            const itemLastName = item.last_name.toUpperCase()
            const itemData = itemCi + " " + itemName + " " + itemLastName
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            users: newData,
            textBuscar: text,
        })
    }

    ///METODO PARA LA PAGINACION CORRECPONDIENTE A LA LIBRERIA https://www.npmjs.com/package/react-js-pagination
    handlePageChange(pageNumber) {

        console.log(`active page is ${pageNumber}`);
        Axios.get(`${url}/api/api-get-users?page=${pageNumber}`)
            .then(data => {
                //console.log(data.data.users.data)
                this.setState({
                        users: data.data.users.data,
                        backupUsers: data.data.users.data,
                        itemsCountPerPage: data.data.users.per_page,
                        totalItemsCount: data.data.users.total,
                        activePage: data.data.users.current_page
                    }
                );
            });

    }

    ////Metodos para cargar la imagen
    onChangeInputFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);

    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                form: {
                    ...this.state.form,
                    url_image: e.target.result
                }

            })
        };

        reader.readAsDataURL(file);
        console.log(this.state.form.url_image)
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Usuarios</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <a href="#" className="btn btn-primary float-right btn-rounded" data-toggle="modal"
                           data-target="#add_group">
                            <i className="fa fa-plus"></i>
                            Agregar usuarios</a>
                    </div>
                </div>
                <div className="row filter-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group form-focus">
                            <label className="focus-label">Buscar por nombres, apellidos y cédula</label>
                            <input type="text" className="form-control floating" value={this.state.textBuscar}
                                   onChange={(e) => this.filter(e)}/>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <label className="focus-label">Rol</label>
                            <select className="select floating">
                                <option value="0">Selecciona</option>
                                {this.state.roles.map((rol) => (
                                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <a href="#" className="btn btn-success btn-block"> Búsqueda profunda </a>
                    </div>
                </div>







                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table">
                                <thead>
                                <tr>
                                    <th className="text-left" style={{width: '200px'}}>Nombre</th>
                                    <th style={{width: '80px'}}>N° Cédula</th>
                                    <th className="text-left" style={{width: '200px'}}>Correo</th>
                                    <th style={{width: '100px'}}>Télefono</th>
                                    <th style={{width: '200px'}}>Ingreso</th>
                                    <th style={{width: '100px'}}>Rol</th>
                                    <th style={{width: '50px'}} className="text-right">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="text-left">
                                            <img width="28" height="28"
                                                 src={user.url_image === "#" ? "assets/img/user.jpg" : `${url}/${user.url_image}`}
                                                 className="rounded-circle" alt=""/>
                                            <h2> {user.name} {user.last_name}</h2>
                                        </td>
                                        <td>{user.ci}</td>
                                        <td className="text-left">{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Intl.DateTimeFormat('es-GB', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(user.created_at))}</td>

                                        <td>
                                            {user.roles.map((rol) => (
                                                <span key={rol.id}
                                                      className={rol.status === "activo" ? "custom-badge status-green" : "custom-badge status-red"}>
                                                        {rol.name}</span>
                                            ))}

                                        </td>
                                        <td className="text-right">
                                            <div className="dropdown dropdown-action">
                                                <a href="#" className="action-icon dropdown-toggle"
                                                   data-toggle="dropdown"
                                                   aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v">
                                                    </i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item" href="#"
                                                       onClick={(e) => this.getOne(user)}
                                                       data-toggle="modal"
                                                       data-target="#add_group">
                                                        <i className="fa fa-pencil m-r-5"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="#" data-toggle="modal"
                                                       onClick={(e) => this.onSelectedDeleteUser(user)}
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
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.totalItemsCount}
                                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                                    onChange={this.handlePageChange.bind(this)}
                                    linkClass="page-link"
                                    itemClass="paginate_button page-item"
                                    hideFirstLastPages={false}
                                />
                            </div>

                        </div>
                    </div>
                </div>











                <div id="add_group" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h3 className="modal-title">Crear nuevo Usuario</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => this.handleSubmit(e, this.state.id)}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Nombres <span
                                                    className="text-danger">*</span></label>
                                                <input id="name" name="name" value={this.state.form.name}
                                                       onChange={this.handleChange}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_name === '' || this.state.errors.er_name === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Apellidos</label>
                                                <input name="last_name" onChange={this.handleChange}
                                                       value={this.state.form.last_name}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_last_name === '' || this.state.errors.er_last_name === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_last_name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Nombre de usuario <span
                                                    className="text-danger">*</span></label>
                                                <input name="username" onChange={this.handleChange}
                                                       className="form-control"
                                                       value={this.state.form.username}
                                                       type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_username === '' || this.state.errors.er_username === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_username}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Correo eléctronico <span
                                                    className="text-danger">*</span></label>
                                                <input id="email" name="email" value={this.state.form.email}
                                                       onChange={this.handleChange}
                                                       className="form-control"
                                                       type="email"/>
                                                <div
                                                    hidden={this.state.errors.er_email === '' || this.state.errors.er_email === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_email}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Cédula</label>
                                                <input id="ci" name="ci"
                                                       value={this.state.form.ci}
                                                       onChange={this.handleChange}
                                                       className="form-control"
                                                       type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_ci === '' || this.state.errors.er_ci === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_ci}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Fecha de nacimiento</label>

                                                <input name="birth_date"
                                                       value={this.state.form.birth_date}
                                                       onChange={this.handleChange}
                                                       type="date"
                                                       className="form-control"/>
                                                <div
                                                    hidden={this.state.errors.er_birth_date === '' || this.state.errors.er_birth_date === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_birth_date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group gender-select">

                                                <label className="gen-label text-left">Género:</label>

                                                <div className="col-lg-12 text-left">
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.onValueChangeGender}
                                                                   checked={this.state.form.gender === "masculino"}
                                                                   value="masculino"
                                                                   type="radio"
                                                                   className="form-check-input"/>Masculino
                                                        </label>
                                                    </div>
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.onValueChangeGender}
                                                                   value="femenino"
                                                                   checked={this.state.form.gender === "femenino"}
                                                                   type="radio"
                                                                   className="form-check-input"/>Femenino
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    hidden={this.state.errors.er_gender === '' || this.state.errors.er_gender === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_gender}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Provincia <span
                                                    className="text-danger">*</span></label>
                                                <input name="province" onChange={this.handleChange} type="text"
                                                       value={this.state.form.province}
                                                       className="form-control"/>
                                                <div
                                                    hidden={this.state.errors.er_province === '' || this.state.errors.er_province === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_province}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Ciudad <span
                                                    className="text-danger">*</span></label>
                                                <input name="city" onChange={this.handleChange}
                                                       value={this.state.form.city}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_city === '' || this.state.errors.er_city === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_city}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Dirección</label>
                                                <input name="address" onChange={this.handleChange}
                                                       value={this.state.form.address}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_address === '' || this.state.errors.er_address === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Teléfono </label>
                                                <input name="phone" onChange={this.handleChange}
                                                       value={this.state.form.phone}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.state.errors.er_phone === '' || this.state.errors.er_phone === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_phone}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Roles</label>
                                                <select name="rol" value={this.state.form.rol}
                                                        onChange={this.handleChange}
                                                        className="form-control">
                                                    {this.state.roles.map((rol) => (
                                                        <option value={rol.id} key={rol.id}>{rol.name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group gender-select">
                                                <label className="gen-label text-left">Estado:</label>
                                                <div className="col-lg-12 text-left">
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.onValueChangeActive}
                                                                   checked={this.state.form.status === "activo"}
                                                                   value="activo"
                                                                   type="radio"
                                                                   className="form-check-input"/>Activo
                                                        </label>
                                                    </div>
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.onValueChangeActive}
                                                                   checked={this.state.form.status === "inactivo"}
                                                                   value="inactivo"
                                                                   type="radio"
                                                                   className="form-check-input"/>Inactivo
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    hidden={this.state.errors.er_status === '' || this.state.errors.er_status === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.state.errors.er_status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="text-left">
                                                    <label className="">Avatar</label>
                                                </div>

                                                <div className="text-left">
                                                    <div className="profile-upload">
                                                        <div className="upload-img">
                                                            <img alt="" src="assets/img/user.jpg"/>
                                                        </div>
                                                        <div className="upload-input">
                                                            <input onChange={this.onChangeInputFile} type="file"
                                                                   className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="m-t-20 text-center modal-footer">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <button
                                                    className="btn btn-primary submit-btn  btn-rounded btn-lg">Guardar
                                                </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <a href="#" type="button" data-dismiss="modal"
                                                   onClick={this.resetErrors}
                                                   className="btn btn-danger submit-btn  btn-rounded btn-lg">Cancelar</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


















                <div id="delete_patient" className="modal fade delete-modal" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src="assets/img/sent.png" alt="" width="50" height="46"/>
                                <h3>¿Estas seguro de eliminar este registro?</h3>
                                <div className="m-t-20">
                                    <a onClick={(e) => this.resetErrors()} href="#" className="btn btn-white"
                                       data-dismiss="modal">Cerrar</a>
                                    <button onClick={(e) => this.onDelete(this.state.form.id)} type="button"
                                            className="btn btn-danger" data-dismiss="modal">Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>






        );
    }
}

