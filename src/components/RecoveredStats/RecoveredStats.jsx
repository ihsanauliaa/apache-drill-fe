import React, { Component } from "react";
import styles from './RecoveredStats.module.css'
import {Card} from "react-bootstrap";

class RecoveredStats extends Component {
    render() {
        // console.log(this.props.indonesiaCode)
        // console.log(this.props.selectedCode)
        // console.log(this.props.indonesiaConfirmed)
        // console.log(this.props.selectedConfirmed)
        // console.log(this.props.indonesiaRecovered)
        // console.log(this.props.selectedRecovered)
        return (
            <React.Fragment>
                <div style={{ paddingBottom: "1rem"}}>
                    <Card>
                        <Card.Header>Recovered</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Placeholder
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default RecoveredStats;