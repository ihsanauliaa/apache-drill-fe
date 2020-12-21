import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import {Col, Container, Row} from "react-bootstrap";
import DailyCases from "../components/DailyCases/DailyCases";
import RecoveredStats from "../components/RecoveredStats/RecoveredStats";
import AccumDeadRecoveredHospitalized
    from "../components/AccumDeadRecoveredHospitalized/AccumDeadRecoveredHospitalized";
import Select from "react-select";

const TITLE = 'Kelompok 16 - Apache Drill'

class Home extends Component {
    state = {
        countryList: [],
        AllDataIndonesia: [],
        AllDataSelected: [],
        ISOCodeIndonesia: "",
        ISOCodeSelected: "",
        TotalRecoveredIndonesia: "",
        TotalConfirmedIndonesia: "",
        TotalRecoveredSelected: "",
        TotalConfirmedSelected: "",
        DailyCasesIndonesia: [],
        DailyCasesSelected: [],
        IndonesiaName: "Indonesia",
        SelectedName: ""
    }

    componentDidMount() {
        this.fetchCountry();
        this.fetchIndonesia();
        this.fetchSelected();
    }

    fetchCountry = () => {
        const URL = "https://run.mocky.io/";
        fetch(URL + "v3/1ab8faa8-4bcb-4f9e-8eed-a3c848ad4b57", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            this.setState({
                countryList: fetchedData
            });
        })
    }
    fetchIndonesia = () => {
        const URL = "https://run.mocky.io/";
        fetch(URL + "v3/67fc448f-2ee7-41e8-b953-c92a04e05b31", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            let recoveredIndonesia;
            let confirmedIndonesia;
            let codeIndonesia;
            let dailyIndonesia;
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            recoveredIndonesia = data.result[0].TotalRecovered;
            confirmedIndonesia = data.result[0].TotalConfirmed;
            codeIndonesia = data.result[0].code;
            dailyIndonesia = data.result[0].daily;
            this.setState({
                AllDataIndonesia: fetchedData,
                TotalRecoveredIndonesia: recoveredIndonesia,
                TotalConfirmedIndonesia: confirmedIndonesia,
                ISOCodeIndonesia: codeIndonesia,
                DailyCasesIndonesia: dailyIndonesia
            });
        })
    }

    fetchSelected = () => {
        const URL = "https://run.mocky.io/";
        fetch(URL + "v3/b1334e3c-d5df-4c80-be38-8c6708eff2b9", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            let recoveredSelected;
            let confirmedSelected;
            let codeSelected;
            let dailySelected;
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            recoveredSelected = data.result[0].TotalRecovered;
            confirmedSelected = data.result[0].TotalConfirmed;
            codeSelected = data.result[0].code;
            dailySelected = data.result[0].daily;
            this.setState({
                AllDataSelected: fetchedData,
                TotalRecoveredSelected: recoveredSelected,
                TotalConfirmedSelected: confirmedSelected,
                ISOCodeSelected: codeSelected,
                DailyCasesSelected: dailySelected
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
                            options={this.state.countryList.map(opt => ({ label: opt.name, value: opt.code }))}
                            onChange={opt => this.setState({
                                SelectedName: opt.label
                            })}
                        />
                    </div>
                    <Row>
                        <Col>
                            <DailyCases indonesiaCode={this.state.ISOCodeIndonesia} selectedCode={this.state.ISOCodeSelected} dailyIndonesia={this.state.DailyCasesIndonesia} dailySelected={this.state.DailyCasesSelected}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <RecoveredStats indonesiaCode={this.state.ISOCodeIndonesia} indonesiaName={this.state.IndonesiaName} selectedCode={this.state.ISOCodeSelected} selectedName={this.state.SelectedName} indonesiaRecovered={this.state.TotalRecoveredIndonesia} selectedRecovered={this.state.TotalRecoveredSelected} indonesiaConfirmed={this.state.TotalConfirmedIndonesia} selectedConfirmed={this.state.TotalConfirmedSelected}/>
                        </Col>
                        <Col>
                            <AccumDeadRecoveredHospitalized allDataIndonesia={this.state.AllDataIndonesia} allDataSelected={this.state.AllDataSelected} />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;