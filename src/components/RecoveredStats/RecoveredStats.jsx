import React, { Component } from "react";
import {Card, Container, Row, Col} from "react-bootstrap";
import {Pie, PieChart, ResponsiveContainer, Cell, Label, Tooltip} from "recharts";
const COLORS = ['#FFEACC', '#FECF28']

function CustomLabel({viewBox, value1}){
    const {cx, cy} = viewBox;
    return (
        <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="16">{value1}</tspan>
        </text>
    )
}

const fillData = (confirmed, recovered) => {
    const data = [];
    data.push({name: 'Non-Recovered', value: confirmed - recovered}, {name: 'Recovered', value: recovered})
    return data
}

const checkDataAvailability = (data, name) => {
    let number = 0;
    for (let i = 0; i < data.length; i++) {
        if (name === data[i].country) {
            if (data[i].recovered !== "NA") {
                number = data[i].recovered
                return number
            }
        }
    }
    return number;
}

// noinspection DuplicatedCode
class RecoveredStats extends Component {
    calculatePercentageIndonesia() {
        let percentageIndonesia;
        percentageIndonesia = (this.props.indonesiaRecovered / this.props.indonesiaConfirmed * 100).toFixed(2)
        let percentageIndonesiaString;
        percentageIndonesiaString = percentageIndonesia + "%"
        return percentageIndonesiaString;
    }
    calculatePercentageSelected() {
        let percentageSelected;
        percentageSelected = (checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName) / this.props.selectedConfirmed * 100).toFixed(2)
        let percentageSelectedString;
        percentageSelectedString = percentageSelected + "%"
        return percentageSelectedString;
    }
    render() {
        if (this.props.selectedName === "") {
            return (
                <React.Fragment>
                    <div style={{ paddingBottom: "1rem"}}>
                        <Card>
                            <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Recovered</Card.Header>
                            <Card.Body>
                                <Container fluid>
                                    <Row>
                                        <Col style={{minHeight: "100"}}>
                                            <ResponsiveContainer width="100%" height={180}>
                                                <PieChart onMouseEnter={this.onPieEnter}>
                                                    <Pie
                                                        data={fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered)}
                                                        innerRadius={55}
                                                        outerRadius={70}
                                                        fill="#8884D8"
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {
                                                            fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                        }
                                                        <Label content={<CustomLabel value1={this.calculatePercentageIndonesia()}/>} position="center" />
                                                    </Pie>
                                                    <Tooltip/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Col>
                                        <Col>
                                            <br/>
                                            <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.indonesiaName}</p>
                                            <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {parseInt(this.props.indonesiaRecovered).toLocaleString("de-DE")}</p>
                                            <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {parseInt(this.props.indonesiaConfirmed).toLocaleString("de-DE")}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            )
        } else {
            if (checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName) === 0) {
                return (
                    <React.Fragment>
                        <div style={{ paddingBottom: "1rem"}}>
                            <Card>
                                <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Recovered</Card.Header>
                                <Card.Body>
                                    <Container fluid>
                                        <Row>
                                            <Col style={{minHeight: "100"}}>
                                                <ResponsiveContainer width="100%" height={180}>
                                                    <PieChart onMouseEnter={this.onPieEnter}>
                                                        <Pie
                                                            data={fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered)}
                                                            innerRadius={55}
                                                            outerRadius={70}
                                                            fill="#8884D8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {
                                                                fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                            }
                                                            <Label content={<CustomLabel value1={this.calculatePercentageIndonesia()}/>} position="center" />
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Col>
                                            <Col>
                                                <br/>
                                                <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.indonesiaName}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {parseInt(this.props.indonesiaRecovered).toLocaleString("de-DE")}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {parseInt(this.props.indonesiaConfirmed).toLocaleString("de-DE")}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div style={{
                                                    position: 'absolute', left: '50%', top: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}>
                                                    <h3 className="font-weight-normal">No data</h3>
                                                </div>
                                            </Col>
                                            <Col>
                                                <br/>
                                                <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.selectedName}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: No Data Available</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {parseInt(this.props.selectedConfirmed).toLocaleString("de-DE")}</p>
                                            </Col>
                                        </Row>
                                    </Container>
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
                                <Card.Header style={{fontWeight: "550", fontSize: "20px"}}>Recovered</Card.Header>
                                <Card.Body>
                                    <Container fluid>
                                        <Row>
                                            <Col style={{minHeight: "100"}}>
                                                <ResponsiveContainer width="100%" height={180}>
                                                    <PieChart onMouseEnter={this.onPieEnter}>
                                                        <Pie
                                                            data={fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered)}
                                                            innerRadius={55}
                                                            outerRadius={70}
                                                            fill="#8884D8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {
                                                                fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                            }
                                                            <Label content={<CustomLabel value1={this.calculatePercentageIndonesia()}/>} position="center" />
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Col>
                                            <Col>
                                                <br/>
                                                <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.indonesiaName}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {parseInt(this.props.indonesiaRecovered).toLocaleString("de-DE")}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {parseInt(this.props.indonesiaConfirmed).toLocaleString("de-DE")}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{minHeight: "100"}}>
                                                <ResponsiveContainer width="100%" height={180}>
                                                    <PieChart onMouseEnter={this.onPieEnter}>
                                                        <Pie
                                                            data={fillData(this.props.selectedConfirmed, checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName))}
                                                            innerRadius={55}
                                                            outerRadius={70}
                                                            fill="#8884D8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {
                                                                fillData(this.props.selectedConfirmed, checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName)).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                            }
                                                            <Label content={<CustomLabel value1={this.calculatePercentageSelected()}/>} position="center" />
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Col>
                                            <Col>
                                                <br/>
                                                <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.selectedName}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {parseInt(checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName)).toLocaleString("de-DE")}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {parseInt(this.props.selectedConfirmed).toLocaleString("de-DE")}</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </React.Fragment>
                );
            }
        }
    }
}

export default RecoveredStats;