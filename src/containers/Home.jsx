import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import {Col, Container, Row} from "react-bootstrap";
import CountrySelector from "../components/CountrySelector/CountrySelector";
import DailyCases from "../components/DailyCases/DailyCases";
import RecoveredStats from "../components/RecoveredStats/RecoveredStats";
import AccumDeadRecoveredHospitalized
    from "../components/AccumDeadRecoveredHospitalized/AccumDeadRecoveredHospitalized";

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
                    <Row>
                        <Col>
                            <DailyCases/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <RecoveredStats/>
                        </Col>
                        <Col>
                            <AccumDeadRecoveredHospitalized/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;