import React, { Component } from "react";
import styles from './AccumDeadRecoveredHospitalized.module.css'
import {Card} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(komponen, valId, valSlc) {
    return { komponen, valId, valSlc };
}

function createDataIndonesiaOnly(komponen, valId) {
    return { komponen, valId };
}

const rows = (props) => {
    // console.log(">>>rows<<<");
    // console.log(props);
    // console.log(props.allDataIndonesia.length)
    // console.log(props.allDataSelected.length)
    if (props.allDataIndonesia.length !== 0 && props.allDataSelected.length !== 0) {
        const data = [
            createData('Confirmed', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalConfirmed), checkDataAvailabilityDeathsHospitalised(props.allDataSelected[props.allDataSelected.length - 1].TotalConfirmed)),
            createData('Recovered', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalRecovered), checkDataAvailability(props.listAPIRecovered, props.selectedName)),
            createData('Dead', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalDeaths), checkDataAvailabilityDeathsHospitalised(props.allDataSelected[props.allDataSelected.length - 1].TotalDeaths)),
            createData('Hospitalized', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalHospitalized), checkDataAvailabilityDeathsHospitalised(props.allDataSelected[props.allDataSelected.length - 1].TotalHospitalised))
        ];
        return data;
    }
}

const rowsIndonesiaOnly = (props) => {
    if (props.allDataIndonesia.length !== 0) {
        return [
            createDataIndonesiaOnly('Confirmed', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalConfirmed)),
            createDataIndonesiaOnly('Recovered', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalRecovered)),
            createDataIndonesiaOnly('Dead', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalDeaths)),
            createDataIndonesiaOnly('Hospitalized', checkDataAvailabilityDeathsHospitalised(props.allDataIndonesia[props.allDataIndonesia.length - 1].TotalHospitalized))
        ];
    }
}

const checkDataAvailability = (data, name) => {
    let number = "No Data";
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].country)
        if (name === data[i].country) {
            number = data[i].recovered
            return number
        }
    }
    return number;
}

const checkDataAvailabilityDeathsHospitalised = (data) => {
    let number = "No Data";
    if (data !== undefined && data !== "") {
        number = parseInt(data)
        return number
    }
    return number
}

class AccumDeadRecoveredHospitalized extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = { data : rows(this.props)};
    // }
    // state = {
    //     data: rows(this.props)
    // }
    state = {
        data: []
    }

    // checkSelectedAvailability = (data) => {
    //     if (data.length !== 0) {
    //         this.setState({
    //             data: rows(data)
    //         }, () =>
    //             console.log(this.state.data))
    //     }
    //     return this.state.data
    // }

    render() {
        // console.log("data tabel <<<<<")
        // console.log(rows(this.props))
        // console.log("<<< props <<<")
        // console.log(rows(this.props))
        // console.log(this.props)
        // console.log(this.state.data)
        // console.log()
        // console.log(this.props.listAPIRecovered)
        // console.log(this.props.selectedName)
        // console.log(this.props.allDataSelected)
        // console.log(checkDataAvailabilityDeathsHospitalised(this.props.allDataSelected[this.props.allDataSelected.length - 1]))
        if (this.props.allDataSelected.length === 0) {
            return (
                <React.Fragment>
                    <Card style={{marginBottom: "2rem"}}>
                        <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Other Stats</Card.Header>
                        <Card.Body>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Statistics</TableCell>
                                            <TableCell align="right">Indonesia</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsIndonesiaOnly(this.props).map((data) => (
                                            <TableRow key={data.komponen}>
                                                <TableCell component="th" scope="row">
                                                    {data.komponen}
                                                </TableCell>
                                                <TableCell align="right">{data.valId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Card style={{marginBottom: "2rem"}}>
                        <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Other Stats</Card.Header>
                        <Card.Body>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Statistics</TableCell>
                                            <TableCell align="right">Indonesia</TableCell>
                                            <TableCell align="right">{this.props.selectedName}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows(this.props).map((data) => (
                                            <TableRow key={data.komponen}>
                                                <TableCell component="th" scope="row">
                                                    {/*{console.log(data.komponen)}*/}
                                                    {data.komponen}
                                                </TableCell>
                                                <TableCell align="right">{data.valId}</TableCell>
                                                <TableCell align="right">{data.valSlc}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            );
        }
    }
}

export default AccumDeadRecoveredHospitalized;