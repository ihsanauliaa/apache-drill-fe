import React, { Component } from "react";
import styles from './DailyCases.module.css'
import {Card} from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
// import moment from "moment";

const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      //"amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
]

const dataToShow = (props) =>{

    var list = []
    if (props.dailyIndonesia == undefined || props.dailySelected == undefined) {
        return "data is not ready"
    }
    props.dailyIndonesia.map((ind) => {
        props.dailySelected.map((scl)=>{
            if (ind.date == scl.date){
                list.push({
                    // name: moment(obj.date).format("DD-MM-YYYY"),
                    date:ind.date,
                    indonesia: ind.NewConfirmed.value,
                    selected : scl.NewConfirmed.value
                })
            }
        })
    })
    console.log("After mapping");
    console.log(list);
    return list;
}
const selectedName = "Selected's total case";
class DailyCases extends Component {
    render() {
        // console.log("this is daily")
        // console.log(this.props.indonesiaCode)
        // console.log(this.props.selectedCode)
        // console.log(this.props.dailyIndonesia)
        // console.log(this.props.dailySelected)
        return (
            <React.Fragment>
                <div style={{ paddingBottom: "1rem"}}>
                    <Card>
                        <Card.Header>Daily Cases</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <LineChart width={730} height={250} data={dataToShow(this.props)}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="indonesia" name="Indonesia's total case" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="selected" name={selectedName} stroke="#82ca9d" />
                                </LineChart>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default DailyCases;