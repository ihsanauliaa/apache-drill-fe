import React, { Component } from "react";
import styles from './CountrySelector.module.css'
import Select from "react-select";

const countries = [
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'France', value: 'France' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Canada', value: 'Canada' },
];

class CountrySelector extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ display: "inline-block"}}>
                    <h2 style={{ paddingTop: "2rem", paddingBottom: "1rem"}}>Compare Indonesia with: </h2>
                </div>
                <div style={{ display: "inline-block", minWidth: "40%", marginLeft: "10px"}}>
                    <Select
                        options={countries}
                        onChange={opt => console.log(opt.value)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default CountrySelector;