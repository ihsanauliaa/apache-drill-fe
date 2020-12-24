import React, { Component } from "react";
import {Card} from "react-bootstrap";
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
    state = {
        data: []
    }

    render() {
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