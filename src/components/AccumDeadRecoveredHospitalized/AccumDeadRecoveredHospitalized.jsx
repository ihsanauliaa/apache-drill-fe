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

const rows = (props) => {
    // console.log(">>>rows<<<");
    // console.log(props);
    // console.log(props.allDataIndonesia.length)
    // console.log(props.allDataSelected.length)
    if (props.allDataIndonesia.length === 1 && props.allDataSelected.length === 1) {
        const data = [
            createData('Dead', props.allDataIndonesia[0].TotalDeaths, props.allDataSelected[0].TotalDeaths),
            createData('Recovered', props.allDataIndonesia[0].TotalRecovered, props.allDataSelected[0].TotalRecovered),
            createData('Hospitalized', props.allDataIndonesia[0].TotalHospitalised, props.allDataSelected[0].TotalHospitalised)
        ];
        return data;
    }
}

class AccumDeadRecoveredHospitalized extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = { data : rows(this.props)};
    // }
    state = {
        data: rows(this.props)
    }
    render() {
        // console.log("data tabel <<<<<")
        // console.log(rows(this.props))
        // console.log("<<< props <<<")
        // console.log(rows(this.props))
        // console.log(this.props)
        console.log(this.state.data)
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>Other Stats</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell align="right">Indonesia</TableCell>
                                        <TableCell align="right">Selected</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.data.map((data) => (
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
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default AccumDeadRecoveredHospitalized;