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
        // console.log(this.state.data)
        // console.log(this.calculatePercentageIndonesia())
        // console.log(this.calculatePercentageSelected())
        // console.log(this.props.indonesiaCode)
        // console.log(this.props.selectedCode)
        // console.log(fillData(this.props.indonesiaConfirmed, this.props.indonesiaRecovered))
        // console.log(this.props.indonesiaConfirmed)
        // console.log(this.props.selectedConfirmed)
        // console.log(this.props.indonesiaRecovered)
        // console.log(this.props.selectedRecovered)
        // console.log(this.props.selectedName)
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
                                            <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {this.props.indonesiaRecovered}</p>
                                            <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {this.props.indonesiaConfirmed}</p>
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
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {this.props.indonesiaRecovered}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {this.props.indonesiaConfirmed}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <br/>
                                                <p style={{fontWeight: "550", fontSize: "24px"}}>{this.props.selectedName}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: No Data Available</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {this.props.selectedConfirmed}</p>
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
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {this.props.indonesiaRecovered}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {this.props.indonesiaConfirmed}</p>
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
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Recovered: {checkDataAvailability(this.props.listAPIRecovered, this.props.selectedName)}</p>
                                                <p style={{fontWeight: "450", fontSize: "18px", marginBottom: "5px"}}>Cumulative Cases: {this.props.selectedConfirmed}</p>
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