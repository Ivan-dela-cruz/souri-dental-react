import React, {Component} from "react";
import ParametersPatients from "./patients/ParametersPatients";
class Search extends Component {


    constructor(props) {
        super(props)
        this.state = {
            parameter: 'ci',
            parameters_list :ParametersPatients.list_parameters
        }
    }

    searchRef = React.createRef()
    getQuery = (e) => {
        e.preventDefault()
        const text_search = this.searchRef.current.value
        const parameter_search= this.state.parameter
        this.props.dataSearch(text_search,parameter_search)

    }

    handleChange=(e) =>{
        this.setState(
            {
                parameter: e.target.value
            }
        )
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.getQuery}>
                    <div className="row filter-row">
                        <div className="col-sm-7 col-md-7">
                            <div className="form-group form-focus ">
                                <label className="focus-label">Buscar por ...</label>
                                <input ref={this.searchRef} type="text" className="form-control floating "/>
                            </div>
                        </div>


                        <div className="col-sm-3 col-md-3">
                            <div className="form-group form-focus select-focus">
                                <label className="focus-label">Seleccione</label>
                                <select name="parameter" onChange={this.handleChange} value={this.state.parameter}
                                        className="form-control">
                                    {this.state.parameters_list.map(parameter => (
                                        <option key={parameter.id} value={parameter.name}>{parameter.tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-sm-2 col-md-2">
                            <button type="submit" className="btn btn-success btn-block">
                               Buscar
                            </button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default Search;