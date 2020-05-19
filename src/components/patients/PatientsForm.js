import React, {Component} from "react";
import url from "../../url";
import Province from "../../data/Province";
import MaritalStatus from "../../data/MaritalStatus";
import InstructionStatus from "../../data/InstructionStatus";
import TypeDocument from "../../data/TypeDocuments";


class PatientsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list_provinces: Province.list_provinces,
            marital_status: MaritalStatus.marital_status,
            instructions_status: InstructionStatus.instructions_status,
            types_documents: TypeDocument.types_documents,

        }

    }

    openModalFormPatients = () => {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title float-left">Usuarios</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <a href="#" className="btn btn-primary float-right btn-rounded" data-toggle="modal"
                           data-target="#add_group">
                            <i className="fa fa-plus"></i>
                            Agregar usuarios
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    modalDeletePatient = () => {
        return (
            <React.Fragment>
                <div id="delete_patient" className="modal fade delete-modal" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <img src="assets/img/sent.png" alt="" width="50" height="46"/>
                                <h3>¿Estas seguro de eliminar este registro?</h3>
                                <div className="m-t-20">
                                    <a onClick={(e) => this.props.resetErrors()} href="#" className="btn btn-white"
                                       data-dismiss="modal">Cerrar</a>
                                    <button onClick={(e) => this.props.onDelete(this.props.form.id)} type="button"
                                            className="btn btn-danger" data-dismiss="modal">Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
    modalFormPatients = () => {
        return (
            <React.Fragment>
                <div id="add_group" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h3 className="modal-title">{this.props.form.id ===0?"Crear nuevo paciente":"Modificar paciente"}</h3>
                                <button type="button" onClick={this.props.resetErrors} className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => this.props.handleSubmit(e, this.props.form.id)}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Nombres <span
                                                    className="text-danger">*</span></label>
                                                <input id="name" name="name" value={this.props.form.name}
                                                       onChange={this.props.handleChange}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_name === '' || this.props.errors.er_name === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Apellidos</label>
                                                <input name="last_name" onChange={this.props.handleChange}
                                                       value={this.props.form.last_name}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_last_name === '' || this.props.errors.er_last_name === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_last_name}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Tipo de documento <span
                                                    className="text-danger">*</span></label>
                                                <select name="type_document" className="form-control" value={this.props.form.type_document} onChange={this.props.handleChange}>
                                                    {this.state.types_documents.map((document)=>(
                                                        <option key={document.id} value={document.name}>{document.tag}</option>
                                                    ))}
                                                </select>
                                                <div
                                                    hidden={this.props.errors.er_username === '' || this.props.errors.er_username === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_username}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Cédula</label>
                                                <input id="ci" name="ci"
                                                       value={this.props.form.ci}
                                                       onChange={this.props.handleChange}
                                                       className="form-control"
                                                       type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_ci === '' || this.props.errors.er_ci === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_ci}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="text-left">
                                                    <label>Sexo:</label>
                                                </div>
                                                <div className="col-lg-12 text-left form-control" >
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeGender}
                                                                   checked={this.props.form.gender === "masculino"}
                                                                   value="masculino"
                                                                   type="radio"
                                                                   className="form-check-input"/>Masculino
                                                        </label>
                                                    </div>
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeGender}
                                                                   value="femenino"
                                                                   checked={this.props.form.gender === "femenino"}
                                                                   type="radio"
                                                                   className="form-check-input"/>Femenino
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    hidden={this.props.errors.er_gender === '' || this.props.errors.er_gender === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_gender}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Fecha de nacimiento</label>

                                                <input name="birth_date"
                                                       value={this.props.form.birth_date}
                                                       onChange={this.props.handleChange}
                                                       type="date"
                                                       className="form-control"/>
                                                <div
                                                    hidden={this.props.errors.er_birth_date === '' || this.props.errors.er_birth_date === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_birth_date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Estado civil <span
                                                    className="text-danger">*</span></label>
                                                <select name="marital_status" className="form-control" value={this.props.form.marital_status} onChange={this.props.handleChange}>
                                                    {this.state.marital_status.map((marital)=>(
                                                        <option key={marital.id} value={marital.name}>{marital.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <div className="text-left">
                                                    <label>Seguro social:</label>
                                                </div>
                                                <div className="col-lg-12 text-left form-control">
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeAffiliate}
                                                                   checked={this.props.form.affiliate === "si"}
                                                                   value="si"
                                                                   type="radio"
                                                                   className="form-check-input"/>Si
                                                        </label>
                                                    </div>
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeAffiliate}
                                                                   checked={this.props.form.affiliate === "no"}
                                                                   value="no"
                                                                   type="radio"
                                                                   className="form-check-input"/>No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Instrucción <span
                                                    className="text-danger">*</span></label>
                                                <select name="instruction" className="form-control" value={this.props.form.instruction} onChange={this.props.handleChange}>
                                                    {this.state.instructions_status.map((instruction)=>(
                                                        <option key={instruction.id} value={instruction.tag}>{instruction.tag}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Dedicación </label>
                                                <input name="job" onChange={this.props.handleChange}
                                                       value={this.props.form.job}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_job === '' || this.props.errors.er_job === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_job}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Teléfono </label>
                                                <input name="phone" onChange={this.props.handleChange}
                                                       value={this.props.form.phone}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_phone === '' || this.props.errors.er_phone === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_phone}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Correo eléctronico <span
                                                    className="text-danger">*</span></label>
                                                <input id="email" name="email" value={this.props.form.email}
                                                       onChange={this.props.handleChange}
                                                       className="form-control"
                                                       placeholder="micorreo@email.com"
                                                       type="email"/>
                                                <div
                                                    hidden={this.props.errors.er_email === '' || this.props.errors.er_email === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_email}
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Provincia <span
                                                    className="text-danger">*</span></label>

                                                <select name="province" value={this.props.form.province}
                                                        onChange={this.props.handleChange}
                                                        className="form-control">
                                                    {this.state.list_provinces.map((province) => (
                                                        <option value={province.province}
                                                                key={province.id}>{province.province}</option>
                                                    ))}
                                                </select>
                                                <div
                                                    hidden={this.props.errors.er_province === '' || this.props.errors.er_province === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_province}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="pull-left">Ciudad <span
                                                    className="text-danger">*</span></label>
                                                <select name="city" className="form-control" value={this.props.form.city}
                                                        onChange={this.props.handleChange}>
                                                    {this.props.list_cities.map((city)=>(
                                                        <option key={city.id} value={city.city}>{city.city}</option>
                                                    ))}

                                                </select>
                                                <div
                                                    hidden={this.props.errors.er_city === '' || this.props.errors.er_city === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_city}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Dirección</label>
                                                <input name="address" onChange={this.props.handleChange}
                                                       value={this.props.form.address}
                                                       className="form-control" type="text"/>
                                                <div
                                                    hidden={this.props.errors.er_address === '' || this.props.errors.er_address === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_address}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="text-left">
                                                    <label>Estado:</label>
                                                </div>
                                                <div className="col-lg-12 text-left form-control">
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeActive}
                                                                   checked={this.props.form.status === "activo"}
                                                                   value="activo"
                                                                   type="radio"
                                                                   className="form-check-input"/>Activo
                                                        </label>
                                                    </div>
                                                    <div className="form-check-inline">
                                                        <label className="form-check-label">
                                                            <input onChange={this.props.onValueChangeActive}
                                                                   checked={this.props.form.status === "inactivo"}
                                                                   value="inactivo"
                                                                   type="radio"
                                                                   className="form-check-input"/>Inactivo
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    hidden={this.props.errors.er_status === '' || this.props.errors.er_status === undefined ? true : false}
                                                    className="alert alert-danger alert-dismissible fade show"
                                                    role="alert">
                                                    <strong>!</strong> {this.props.errors.er_status}
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
                                                            <img alt=""
                                                                 src={this.props.form.id === 0 ? "assets/img/user.jpg" : `${url}/${this.props.form.url_image}`}
                                                            />
                                                        </div>
                                                        <div className="upload-input">
                                                            <input value={null} onChange={this.props.onChangeInputFile}
                                                                   type="file"
                                                                   className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-12 text-left">
                                            <h4>Información médica</h4>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Tipo de sangre <span
                                                    className="text-danger">*</span></label>
                                                <input id="blood_type" name="blood_type" value={this.props.form.blood_type}
                                                       onChange={this.props.handleChange}
                                                       className="form-control" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="pull-left">Alergía <span
                                                    className="text-danger">*</span></label>
                                                <input id="allergy" name="allergy" value={this.props.form.allergy}
                                                       onChange={this.props.handleChange}
                                                       className="form-control" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="pull-left">Observaciones <span
                                                    className="text-danger">*</span></label>
                                                <textarea  id="observation" name="observation" value={this.props.form.observation}
                                                       onChange={this.props.handleChange}
                                                       className="form-control" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="pull-left">Antecedentes importantes <span
                                                    className="text-danger">*</span></label>
                                                <textarea  id="history_medical" name="history_medical" value={this.props.form.history_medical}
                                                       onChange={this.props.handleChange}
                                                       className="form-control" type="text"/>
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
                                                   onClick={this.props.resetErrors}
                                                   className="btn btn-danger submit-btn  btn-rounded btn-lg">Cancelar</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.openModalFormPatients()}
                {this.modalFormPatients()}

            </React.Fragment>
        );
    }
}

export default PatientsForm;