import React, { Component } from "react";
import styles from './CountrySelector.module.css'
import Select from "react-select";

class CountrySelector extends Component {
    state = {
        countryList: []
    }

    componentDidMount() {
        this.fetchCountry();
    }

    fetchCountry = () => {
        const URL = "https://run.mocky.io/";
        fetch(URL + "v3/3441cc29-0c37-41c7-873b-899c7e1535a6", {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then((data) => {
            const fetchedData = [];
            for (let key in data.result) {
                fetchedData.push({
                    ...data.result[key]
                });
            }
            this.setState({
                countryList: fetchedData
            });
        })
    }

    render() {
        console.log(this.state.countryList);
        return (
            <React.Fragment>
                <div style={{ display: "inline-block"}}>
                    <h2 style={{ paddingTop: "2rem", paddingBottom: "1rem"}}>Compare Indonesia with: </h2>
                </div>
                <div style={{ display: "inline-block", minWidth: "40%", marginLeft: "10px"}}>
                    <Select
                        options={this.state.countryList.map(opt => ({ label: opt.name, value: opt.code }))}
                        onChange={opt => console.log(opt.value)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default CountrySelector;