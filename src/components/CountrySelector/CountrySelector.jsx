import React, { Component } from "react";
import styles from './CountrySelector.module.css'
import Select from "react-select";

class CountrySelector extends Component {

    render() {
        // console.log(this.state.countryList);
        return (
            <React.Fragment>
                <div style={{ display: "inline-block"}} className={styles.selector}>
                    <h2 style={{ paddingTop: "2rem", paddingBottom: "1rem"}}>Compare Covid in Indonesia with: </h2>
                </div>
                <div style={{ display: "inline-block", minWidth: "40%", paddingBottom: "1rem"}}>
                    <Select
                        options={this.props.countries.map(opt => ({ label: opt.name, value: opt.code }))}
                        onChange={opt => console.log(opt.value)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default CountrySelector;