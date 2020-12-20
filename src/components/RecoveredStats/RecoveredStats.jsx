import React, { Component } from "react";
import styles from './RecoveredStats.module.css'
import {Card} from "react-bootstrap";

class RecoveredStats extends Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>Recovered</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Placeholder
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default RecoveredStats;