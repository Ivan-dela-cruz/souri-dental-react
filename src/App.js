import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Content from "./components/Content";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Patients from "./components/patients/Patients";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CSSTransition, TransitionGroup,} from 'react-transition-group';

function App() {
    return (
        <div className="App">
            <Router>
                <Fragment>
                    <div className="main-wrapper">
                        <Header/>
                        <div className="sidebar" id="sidebar">
                            <div className="sidebar-inner slimscroll">
                                <NavBar/>
                            </div>
                        </div>
                        <div className="page-wrapper">
                            <div className="content">
                                <TransitionGroup>
                                    <CSSTransition
                                        timeout={500}
                                        classNames="item"
                                    >
                                        <Switch>
                                            <Route exact path="/" component={Content}/>
                                            <Route exact path="/pacientes" component={Patients}/>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Router>


        </div>
    );
}

export default App;
