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
        // AllDataIndonesia: [],
        // AllDataSelected: [],
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
        // isLoadingSelected: true,
        isLoadingCountryList: true,
        isLoadingRecovered: true
    }

    componentDidMount() {
        this.fetchCountry();
        this.fetchIndonesia();
        // this.fetchSelected();
        this.fetchRecovered();
    }

    handleApply = (country_name, country_code) => {
        // console.log(country_code)
        let name = country_name
        let code = country_code
        // console.log(name)
        this.setState({
            SelectedName: name,
            ISOCodeSelected: code
        }, () =>
            this.fetchSelected())
        // this.fetchSelected();
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
            // codeIndonesia = data.result[0].code;
            dailyIndonesia = data.data;
            this.setState({
                // AllDataIndonesia: fetchedData,
                TotalRecoveredIndonesia: parseInt(recoveredIndonesia),
                TotalConfirmedIndonesia: parseInt(confirmedIndonesia),
                // ISOCodeIndonesia: codeIndonesia,
                DailyCasesIndonesia: dailyIndonesia,
                isLoadingIndonesia: false
            });
        })
    }

    fetchSelected = () => {
        const URL = "http://127.0.0.1:5000/";
        // console.log(URL + "country?iso=" + this.state.ISOCodeSelected)
        fetch(URL + "country?iso=" + this.state.ISOCodeSelected, {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            // let recoveredSelected;
            let confirmedSelected;
            // let codeSelected;
            let dailySelected;
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            // recoveredSelected = data.result[data.result.length - 1].TotalRecovered;
            confirmedSelected = data.result[data.result.length - 1].TotalConfirmed;
            // codeSelected = data.result[data.result.length - 1].code;
            dailySelected = data.result;
            // console.log(data.result)
            this.setState({
                // AllDataSelected: fetchedData,
                // TotalRecoveredSelected: recoveredSelected,
                TotalConfirmedSelected: parseInt(confirmedSelected),
                // ISOCodeSelected: codeSelected,
                DailyCasesSelected: dailySelected,
                // isLoadingSelected: false
            });
        })
    }

    render() {
        // console.log("this is home")
        // console.log(this.state.AllDataIndonesia)
        // console.log(this.state.DailyCasesIndonesia)
        // console.log(this.state.DailyCasesSelected)
        // console.log(this.state.AllDataSelected)
        // console.log(this.state.TotalConfirmedSelected)
        // console.log(this.state.TotalRecoveredSelected)
        // console.log(this.state.DailyCasesSelected)
        // console.log(this.state.DailyCasesIndonesia)
        // console.log(this.state.TotalConfirmedSelected)
        // console.log(this.state.TotalConfirmedIndonesia)
        // console.log(this.state.TotalRecoveredIndonesia)
        // console.log(this.state.SelectedName)
        // console.log(this.state.ISOCodeSelected)
        if (this.state.isLoadingCountryList || this.state.isLoadingIndonesia || this.state.isLoadingRecovered) {
            // console.log(this.state.Recovered)
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