import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import DailyCases from "../components/DailyCases/DailyCases";
import RecoveredStats from "../components/RecoveredStats/RecoveredStats";
import AccumDeadRecoveredHospitalized
    from "../components/AccumDeadRecoveredHospitalized/AccumDeadRecoveredHospitalized";
import Select from "react-select";

const TITLE = 'Kelompok 16 - Apache Drill'

class Home extends Component {
    state = {
        countryList: [],
        ISOCodeIndonesia: "",
        ISOCodeSelected: "",
        TotalRecoveredIndonesia: "",
        TotalConfirmedIndonesia: "",
        TotalRecoveredSelected: "",
        TotalConfirmedSelected: "",
        DailyCasesIndonesia: [],
        DailyCasesSelected: [],
        IndonesiaName: "Indonesia",
        SelectedName: "",
        Recovered: [],
        isSelected: false,
        isLoadingIndonesia: true,
        isLoadingCountryList: true,
        isLoadingRecovered: true
    }

    componentDidMount() {
        this.fetchCountry();
        this.fetchIndonesia();
        this.fetchRecovered();
    }

    handleApply = (country_name, country_code) => {
        let name = country_name
        let code = country_code
        this.setState({
            SelectedName: name,
            ISOCodeSelected: code
        }, () =>
            this.fetchSelected())
    };

    fetchCountry = () => {
        const URL = "http://127.0.0.1:5000/";
        fetch(URL + "countries", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            for (let key in data.data) {
                fetchedData.push({
                    ...data.data[key]
                });
            }
            this.setState({
                countryList: fetchedData,
                isLoadingCountryList: false
            });
        })
    }

    fetchRecovered = () => {
        const URL = "https://api.apify.com/";
        fetch(URL + "v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            for (let key in data) {
                fetchedData.push({
                    ...data[key]
                });
            }
            this.setState({
                Recovered: fetchedData,
                isLoadingRecovered: false
            });
        })
    }

    fetchIndonesia = () => {
        const URL = "http://127.0.0.1:5000/";
        fetch(URL + "indonesia", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            let recoveredIndonesia;
            let confirmedIndonesia;
            // let codeIndonesia;
            let dailyIndonesia;
            for (let key in data.data) {
                fetchedData.push({
                    ...data.data[key]
                });
            }
            recoveredIndonesia = data.data[data.data.length - 1].TotalRecovered;
            confirmedIndonesia = data.data[data.data.length - 1].TotalConfirmed;
            dailyIndonesia = data.data;
            this.setState({
                TotalRecoveredIndonesia: parseInt(recoveredIndonesia),
                TotalConfirmedIndonesia: parseInt(confirmedIndonesia),
                DailyCasesIndonesia: dailyIndonesia,
                isLoadingIndonesia: false
            });
        })
    }

    fetchSelected = () => {
        const URL = "http://127.0.0.1:5000/";
        fetch(URL + "country?iso=" + this.state.ISOCodeSelected, {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            let confirmedSelected;
            let dailySelected;
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            confirmedSelected = data.result[data.result.length - 1].TotalConfirmed;
            dailySelected = data.result;
            this.setState({
                TotalConfirmedSelected: parseInt(confirmedSelected),
                DailyCasesSelected: dailySelected,
            });
        })
    }

    render() {
        if (this.state.isLoadingCountryList || this.state.isLoadingIndonesia || this.state.isLoadingRecovered) {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>{ TITLE }</title>
                    </Helmet>
                    <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>{ TITLE }</title>
                    </Helmet>
                    <Container fluid>
                        <div style={{ display: "inline-block"}}>
                            <h2 style={{ paddingTop: "2rem", paddingBottom: "1rem", marginRight: "10px"}}>Compare Indonesia with: </h2>
                        </div>
                        <div style={{ display: "inline-block", minWidth: "40%", paddingBottom: "1rem"}}>
                            <Select
                                options={this.state.countryList.map(opt => ({ label: opt.location, value: opt.iso_code }))}
                                onChange={opt => this.handleApply(opt.label, opt.value)}
                            />
                        </div>
                        <Row>
                            <Col>
                                <DailyCases dailyIndonesia={this.state.DailyCasesIndonesia} dailySelected={this.state.DailyCasesSelected} selectedName={this.state.SelectedName}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RecoveredStats indonesiaName={this.state.IndonesiaName} selectedName={this.state.SelectedName} indonesiaRecovered={this.state.TotalRecoveredIndonesia} indonesiaConfirmed={this.state.TotalConfirmedIndonesia} selectedConfirmed={this.state.TotalConfirmedSelected} listAPIRecovered={this.state.Recovered}/>
                            </Col>
                            <Col>
                                <AccumDeadRecoveredHospitalized allDataIndonesia={this.state.DailyCasesIndonesia} allDataSelected={this.state.DailyCasesSelected} selectedName={this.state.SelectedName} listAPIRecovered={this.state.Recovered}/>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            );
        }
    }
}

export default Home;