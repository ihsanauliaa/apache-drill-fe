import React, { Component } from "react";
import styles from './DailyCases.module.css'
import {Card} from "react-bootstrap";

class DailyCases extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingBottom: "1rem"}}>
                    <Card>
                        <Card.Header>Daily Cases</Card.Header>
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

export default DailyCases;