import React, {Component, useState, useEffect} from "react";
import Search from "../Search";
import url from "../../url";
import Axios from "axios";
import PatientsList from "./PatientsList";
import Pagination from "react-js-pagination";
import PatientsForm from "./PatientsForm";
import CitiesProvince from "../../data/CitiesProvince";
import Swal from 'sweetalert2'

class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_search: '',
            parameter_search: '',
            users: [],
            backupUsers: [],
            list_cities: [],
            backup_cities: [],
            errors: {
                er_name: '',
                er_email: '',
                er_ci: '',
                er_last_name: '',
                er_birth_date: '',
                er_gender: '',
                er_address: '',
                er_province: '',
                er_city: '',
                er_phone: '',
                er_url_image: '',
                er_status: '',
                er_job: ''
            },
            form: {
                id: 0,
                name: '',
                email: '',
                type_document: 'cedula',
                ci: '',
                last_name: '',
                birth_date: '',
                gender: 'masculino',
                address: '',
                province: 'Azuay',
                city: 'Cuenca',
                phone: '',
                url_image: '#',
                status: 'activo',
                ///campos de la tabla patients de la base de datos
                instruction: 'primaria',
                marital_status: 'Casado(a)',
                affiliate: 'no',
                allergy: '',
                job: '',
                blood_type: '',
                observation: '',
                history_medical: ''
            },
            //variables de la paginacion
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 10,
        }
        this.resetPagination = this.resetPagination.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.onValueChangeActive = this.onValueChangeActive.bind(this)
        this.onValueChangeGender = this.onValueChangeGender.bind(this)
        this.onValueChangeAffiliate = this.onValueChangeAffiliate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetErrors = this.resetErrors.bind(this)
        this.onChangeInputFile = this.onChangeInputFile.bind(this)
        this.createImage = this.createImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeErrors = this.changeErrors.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.changeStatus = this.changeStatus.bind(this)

    }

    alertSweet = () => {
        Swal.fire({
            title: 'Esta seguro en descativar?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    async componentDidMount() {
        this.dataSearch("", "ci")
        this.setState({
            list_cities: CitiesProvince.list_cities,
            backup_cities: CitiesProvince.list_cities
        }, () => {
            this.filterCities(this.state.form.province)
        })

    }

    ///FILTRAR LAS PROVINCIAS
    filterCities = (province) => {
        const data = this.state.backup_cities

        const newData = data.filter(function (item) {
            const itemData = item.province.toUpperCase()
            const textData = province.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            list_cities: newData,

        })
    }

//CALCULO DE LA EDAD MEDIANTE EL CAMPO birth_date del usuario
    agePatient = (birh_date) => {
        const age = Math.floor((new Date() - new Date(birh_date).getTime()) / 3.15576e+10)
        return age
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
                let res = await fetch(`${url}/api/api-store-patients`, config)
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
                let res = await fetch(`${url}/api/api-put-patients/${this.state.form.id}`, config)
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

    ///METODO RESETEA LOS ESTADOS DE LA PAGINACION
    resetPagination() {
        this.setState({
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
        })
    }

    ///METODO PARA LA PAGINACION CORRECPONDIENTE A LA LIBRERIA https://www.npmjs.com/package/react-js-pagination
    handlePageChange(pageNumber) {
        const text_search = this.state.text_search
        const parameter_search = this.state.parameter_search
        //http://localhost/souri/public/api/api-get-filter-users?text_search=1750474048&parameter_search=ci
        const api_url = `${url}/api/api-get-patients?page=${pageNumber}&text_search=${text_search}&parameter_search=${parameter_search}`
        Axios.get(api_url)
            .then(data => {
                //console.log(data.data.users.data)
                this.setState({
                        users: data.data.users.data,
                        itemsCountPerPage: data.data.users.per_page,
                        totalItemsCount: data.data.users.total,
                        activePage: data.data.users.current_page,
                        backupUsers: data.data.users.data,
                    }
                );
            });
    }

    dataSearch = (data, parameter) => {
        this.setState({
                text_search: data,
                parameter_search: parameter
            }, () => {
                this.queryTextSearch()
            }
        )
    }
    dataEditUser = (user) => {

        this.setState({
            form: {
                ...this.state.form,
                id: user.id,
                name: user.name,
                email: user.email,
                ci: user.ci,
                last_name: user.last_name,
                birth_date: user.birth_date,
                gender: user.gender,
                address: user.address,
                province: user.province,
                city: user.city,
                phone: user.phone,
                url_image: user.url_image,
                status: user.status,
                type_document: user.type_document,
                instruction: user.patient.instruction,
                marital_status: user.patient.marital_status,
                affiliate: user.patient.affiliate,
                allergy: user.patient.allergy,
                job: user.patient.job,
                blood_type: user.patient.blood_type,
                observation: user.patient.observation,
                history_medical: user.patient.history_medical
            }
        }, () => {
            this.filterCities(this.state.form.province)
        })
    }

    queryTextSearch = () => {
        try {
            const text_search = this.state.text_search
            const parameter_search = this.state.parameter_search
            //http://localhost/souri/public/api/api-get-filter-users?text_search=1750474048&parameter_search=ci
            const api_url = `${url}/api/api-get-patients?text_search=${text_search}&parameter_search=${parameter_search}`
            // const api_url = `${url}/api/api-get-patients`
            Axios.get(api_url)
                .then((res) => {
                    this.setState({
                        users: res.data.users.data,
                        itemsCountPerPage: res.data.users.per_page,
                        totalItemsCount: res.data.users.total,

                    })

                })
        } catch (e) {
        }
    }

    //METODO PARA CAMBIAR EL ESTADO DE RADIO BUTTON AFILIADO
    onValueChangeAffiliate(event) {
        this.setState({
            form: {
                ...this.state.form,
                affiliate: event.target.value,
            }
        });


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
        }, () => {
            this.filterCities(this.state.form.province)
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
                er_birth_date: data.errors.birth_date,
                er_gender: data.errors.gender,
                er_address: data.errors.address,
                er_province: data.errors.province,
                er_city: data.errors.city,
                er_phone: data.errors.phone,
                er_url_image: data.errors.url_image,
                er_status: data.errors.status,
                er_job: data.errors.job
            }

        })
    }

    //METODO QUE SELECIONA UN USUARIO PARA SER ELIMINADO
    onSelectedDeleteUser = (user) => {
        this.setState({
            form: {
                ...this.state.form,
                id: user.id
            }
        })
    }

    //METODO PARA ELIMINAR UN USUARIO MEDIANTE AXIOS
    onDelete(id) {

        Swal.fire({
            title: 'Esta seguro de eliminar este registro ?',
            text: 'Usted no prodra revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Estoy seguro!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${url}/api/api-delete-user/${id}`)
                    .then((res) => {
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado con éxito.',
                            'success'
                        )
                        this.resetPagination()
                        this.componentDidMount()
                        this.resetErrors()
                    }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Algo ha salido mal!'
                    })
                })


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    '',
                    'error'
                )
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
                er_status: '',
                er_job: ''
            },
            form: {
                ...this.state.form,
                id: 0,
                name: '',
                email: '',
                type_document: 'cedula',
                ci: '',
                last_name: '',
                birth_date: '',
                gender: 'masculino',
                address: '',
                province: 'Azuay',
                city: 'Cuenca',
                phone: '',
                url_image: '#',
                status: 'activo',
                instruction: 'primaria',
                marital_status: 'Casado(a)',
                affiliate: 'no',
                allergy: '',
                job: '',
                blood_type: '',
                observation: '',
                history_medical: ''
            }
        })
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

    //METODO PARA DESACTIVAR EL ESTADO DE LOS PACIENTES
    changeStatus(id) {
        Swal.fire({
            title: '¿Está seguro en cambiar el Estado?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, cambiar',
            cancelButtonText: 'No, mantener'
        }).then((result) => {
            if (result.value) {
                Axios.put(`${url}/api/api-change-status-user`, {
                    'id': id
                }).then(function (response) {

                    this.resetPagination()
                    this.componentDidMount()
                    this.resetErrors()

                }).catch(function (error) {

                    console.log(error)
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    '',
                    'error'
                )
            }
        })

    }

    renderNavigation = () => {
        if(this.state.totalItemsCount>10){
            return (
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
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <Search dataSearch={this.dataSearch}/>
                <PatientsForm users={this.state.users}
                              form={this.state.form}
                              errors={this.state.errors}
                              onValueChangeActive={this.onValueChangeActive}
                              onValueChangeGender={this.onValueChangeGender}
                              onValueChangeAffiliate={this.onValueChangeAffiliate}
                              handleChange={this.handleChange}
                              resetErrors={this.resetErrors}
                              onChangeInputFile={this.onChangeInputFile}
                              handleSubmit={this.handleSubmit}
                              list_cities={this.state.list_cities}

                />
                <PatientsList
                    users={this.state.users}
                    onSelectedDeleteUser={this.onSelectedDeleteUser}
                    dataEditUser={this.dataEditUser}
                    agePatient={this.agePatient}
                    changeStatus={this.changeStatus}
                    onDelete={this.onDelete}
                />

                {this.renderNavigation()}

            </React.Fragment>
        );
    }
}

export default Patients;