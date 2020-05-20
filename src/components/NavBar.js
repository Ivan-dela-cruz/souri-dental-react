import React from 'react';
import {Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom'


function NavBar() {
    return (
        <div id="sidebar-menu" className="sidebar-menu">
            <ul>
                <li className="menu-title">Panel de control</li>
                <li >
                    <Link to="/" > <i className="fa fa-dashboard"></i><span>Inicio</span></Link>
                </li>
                <li>
                    <a href="#"><i className="fa fa-user-md"></i> <span>Doctores</span></a>
                </li>
                <li>
                    <NavLink activeClassName="text-primary" exact to="/">
                        <i className="fa fa-book"></i> <span>Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="text-primary" to="/pacientes">
                        <i className="fa fa-calendar-check-o"></i> <span>Pacientes</span>
                    </NavLink>
                </li>
                <li>
                    <a href="departments.html"><i className="fa fa-hospital-o"></i> <span>Departamentos</span></a>
                </li>
                <li className="submenu">
                    <a href="#"><i className="fa fa-user"></i> <span> Usuarios </span> <span
                        className="menu-arrow"></span></a>
                    <ul >
                        <li>
                            <NavLink className="text-left" activeClassName="text-primary" exact to="/">
                                Lista de usuario
                            </NavLink>
                        </li>
                        <li><a className="text-left" href="leaves.html">Hojas</a></li>
                        <li><a className="text-left" href="holidays.html">Días festivos</a></li>
                        <li><a className="text-left" href="attendance.html">Asistencia</a></li>
                    </ul>
                </li>
                <li className="submenu">
                    <a href="#"><i className="fa fa-user"></i> <span> Pacientes </span> <span
                        className="menu-arrow"></span></a>
                    <ul >
                        <li>
                            <NavLink className="text-left" activeClassName="text-primary"  to="/pacientes">
                                Lista de pacientes
                            </NavLink>
                        </li>
                        <li><a className="text-left" href="leaves.html">Hojas</a></li>
                        <li><a className="text-left" href="holidays.html">Días festivos</a></li>
                        <li><a className="text-left" href="attendance.html">Asistencia</a></li>
                    </ul>
                </li>
                <li className="submenu">
                    <a href="#"><i className="fa fa-money"></i> <span> Cuentas </span> <span
                        className="menu-arrow"></span></a>
                    <ul >
                        <li><a className="text-left" href="invoices.html">Facturas</a></li>
                        <li><a className="text-left" href="payments.html">Pagos</a></li>
                        <li><a className="text-left" href="expenses.html">Gastos</a></li>
                        <li><a className="text-left" href="taxes.html">Impuestos</a></li>
                        <li><a className="text-left" href="provident-fund.html">Fondo de provisión</a></li>
                    </ul>
                </li>
                <li className="submenu">
                    <a href="#"><i className="fa fa-book"></i> <span> Nómina sueldos </span> <span
                        className="menu-arrow"></span></a>
                    <ul>
                        <li><a className="text-left" href="salary.html"> Salario empleados </a></li>
                        <li><a className="text-left" href="salary-view.html"> Recibo de sueldo </a></li>
                    </ul>
                </li>
                <li>
                    <a href="assets.html"><i className="fa fa-cube"></i> <span>Bienes</span></a>
                </li>

                <li className="submenu">
                    <a href="#"><i className="fa fa-flag-o"></i> <span> Reportes </span> <span
                        className="menu-arrow"></span></a>
                    <ul >
                        <li><a className="text-left" href="invoice-reports.html"> Reporte de Consultas </a></li>
                        <li><a className="text-left" href="invoice-reports.html"> Reporte de Citas </a></li>
                        <li><a className="text-left" href="invoice-reports.html"> Reporte de Empleados </a></li>
                        <li><a className="text-left" href="invoice-reports.html"> Reporte de Gastos </a></li>
                        <li><a className="text-left" href="invoice-reports.html"> Reporte de Pacientes </a></li>
                        <li><a className="text-left" href="expense-reports.html"> Reporte de Usuarios </a></li>
                    </ul>
                </li>
                <li>
                    <a href="settings.html"><i className="fa fa-cog"></i> <span>Configuraciones</span></a>
                </li>
            </ul>
        </div>

    );
}

export default NavBar;