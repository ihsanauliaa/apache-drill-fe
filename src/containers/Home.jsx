import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import {Container} from "react-bootstrap";
import CountrySelector from "../components/CountrySelector/CountrySelector";

const TITLE = 'Kelompok 16 - Apache Drill'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <Container fluid>
                    <CountrySelector/>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;