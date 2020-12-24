import React, { Component } from "react";
import {Card} from "react-bootstrap";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

// Karena pas buka page awal belum ada props buat yang selected, bakal bikin conditional rendering
// Conditional rendering buat kalau belum ada props selected sama udah ada
// Oleh karena itu, dataToShow dipecah jadi 2. Ada dataToShowBoth untuk isi data ketika selected dan indonesia udah ada
// Ada juga dataToShow aja yang cuma isi data indonesia aja
const dataToShowBoth = (props) => {

    const list = [];
    props.dailyIndonesia.map((ind) => {
        props.dailySelected.map((scl) => {
            if (ind.Tanggal === scl.Tanggal) {
                if (ind.NewConfirmed === "") {
                    list.push({
                        date:ind.Tanggal,
                        indonesia: 0,
                        selected : parseInt(scl.NewConfirmed)
                    })
                } else if (scl.NewConfirmed === "") {
                    list.push({
                        date:ind.Tanggal,
                        indonesia: parseInt(ind.NewConfirmed),
                        selected : 0
                    })
                } else if (scl.NewConfirmed === "" && ind.NewConfirmed === "") {
                    list.push({
                        date:ind.Tanggal,
                        indonesia: 0,
                        selected : 0
                    })
                } else {
                    list.push({
                        date:ind.Tanggal,
                        indonesia: parseInt(ind.NewConfirmed),
                        selected : parseInt(scl.NewConfirmed)
                    })
                }
            }
        })
    })
    return list;
}

const dataToShow = (props) => {

    const list = [];

    props.dailyIndonesia.map((ind) => {
        if (ind.NewConfirmed === "") {
            list.push({
                date:ind.Tanggal,
                indonesia: 0,
            })
        } else {
            list.push({
                date:ind.Tanggal,
                indonesia: parseInt(ind.NewConfirmed),
            })
        }
    })
    return list;
}

class DailyCases extends Component {
    render() {
        if (this.props.dailySelected === undefined || this.props.dailySelected.length === 0) {
            return (
                <React.Fragment>
                    <div style={{ paddingBottom: "1rem"}}>
                        <Card>
                            <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Daily Cases</Card.Header>
                            <Card.Body style={{ minHeight: "100"}}>
                                <ResponsiveContainer width="100%" height={480}>
                                    <LineChart width={730} height={250} data={dataToShow(this.props)}
                                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="indonesia" name="Indonesia's daily case" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div style={{ paddingBottom: "1rem"}}>
                        <Card>
                            <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Daily Cases</Card.Header>
                            <Card.Body style={{ minHeight: "100"}}>
                                <ResponsiveContainer width="100%" height={480}>
                                    <LineChart data={dataToShowBoth(this.props)}
                                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="indonesia" name="Indonesia" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="selected" name={this.props.selectedName} stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default DailyCases;