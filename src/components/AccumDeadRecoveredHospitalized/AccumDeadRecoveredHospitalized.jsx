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

// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//   });
  
function createData(komponen, valId, valSlc) {
    return { komponen, valId, valSlc };
}
  
// const rows = [
//     createData('Dead', props.allDataIndonesia.TotalDeaths, props.allDataSelected.TotalDeaths),
//     createData('Recovered', props.allDataIndonesia.TotalRecovered, props.allDataSelected.TotalRecovered),
//     createData('Hospitalized', props.allDataIndonesia.TotalHospitalised, props.allDataSelected.TotalHospitalised)
// ];

const rows = (props) => {
    console.log(">>>rows<<<");
    console.log(props);
    const data = [
        createData('Dead', props.allDataIndonesia.TotalDeaths, props.allDataSelected.TotalDeaths),
        createData('Recovered', props.allDataIndonesia.TotalRecovered, props.allDataSelected.TotalRecovered),
        createData('Hospitalized', props.allDataIndonesia.TotalHospitalised, props.allDataSelected.TotalHospitalised)
    ];
    return data;
}

class AccumDeadRecoveredHospitalized extends Component {
    constructor(props) 
    { 
        super(props); 
        this.state = { data : []}; 
    } 
    render() {
        console.log("data tabel <<<<<")
        console.log(this.state.data)
        console.log("<<< props <<<")
        console.log(this.props)
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>Other Stats</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <TableContainer component={Paper}>
                                {/* <Table className={classes.table} aria-label="simple table"> */}
                                <Table aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
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