import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StateDropdown, RegionDropdown } from 'react-india-state-region-selector';
import "./Filters.css"

class Filters extends Component {

    constructor(props) {
        super(props)
        this.state = {
            host : "http://localhost:2000/jobs/",
            filter : null,
            value : null,
            offset : 0,
            state : "",
            region : "",
            from : "",
            to : ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({
            filter : e.target.name,
            value : e.target.value
        })
    }

    selectState(val) {
        this.setState({
            filter : "state",
            value : val,
            state : val
        });
    }

    selectRegion(val) {
        this.setState({
            filter : "region",
            value : val,
            region : val
        });
    }

    handleInputChangeDateFrom = (e) => {
        this.setState({
            filter : "from",
            value : e.toString(),
            from : e
        })
    }

    handleInputChangeDateTo = (e) => {
        this.setState({
            filter : "to",
            value : e.toString(),
            to : e
        })
    }

    submitData = () => {
        console.log(this.state);
        let url = this.state.host;
        if (this.state.filter != null && this.state.value != null) {
            url += `${this.state.filter}/${this.state.value}/`;
        }
        url += this.state.offset;
        fetch(url)
        .then(res => res.json())
        .then(data => this.getData(data))
        .catch(err => console.error(err));
    }

    getData = (data) => {
        console.log(data);
    }

    render () {
        return (
            <div class="row">
                <div class="col">
                    <div class="row">
                        <h1>Only 1 filter works at a time</h1>
                        <br />
                    </div>
                    {/* <div class="row">
                        <h1>by Title</h1>
                        <br />
                        <input value="" />
                    </div>
                    <div class="row">
                        <h1>by Money</h1>
                        <br />
                        <input value="" />
                    </div> */}
                    
                    <div className="form-group">
                                        <label className="font-increase-label">Job Title*</label>
                                        <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange}/>
                                        <br />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-increase-label">Salary*</label>
                                        <input type="number" id="salary" name="salary" className="form-control"  onChange={this.handleInputChange}></input>
                                        <div className="desc-feat">Mention salary as per day.</div>
                                    </div>
                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">State*</label>
                                            <br />
                                            <StateDropdown id="state" name="state" className="form-control" value={this.state.state} onChange={(val) => this.selectState(val)} />
                                            <br />
                                        </div>

                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">Region*</label>
                                            <br />
                                            <RegionDropdown id="region" name="region" className="form-control" State={this.state.state} value={this.state.region} onChange={(val) => this.selectRegion(val)} />
                                            <br />
                                        </div>
                                    </div>

                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label>Start Date*</label><br />
                                            <DatePicker
                                                selected={this.state.from}
                                                onChange={this.handleInputChangeDateFrom}
                                                name="from"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control" />

                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>End Date*</label><br />
                                            <DatePicker
                                                selected={this.state.to}
                                                onChange={this.handleInputChangeDateTo}
                                                name="to"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                    <div class="row">
                        <button onClick={this.submitData}>Dabao Mujhe</button>
                    </div>
                </div>
            </div>
        );
    }
}
  

export default Filters;