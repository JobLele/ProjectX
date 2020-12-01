{/* this shit starts */}

<div class="row">
<div class="col">
    <div class="row">
        <h1>Only 1 filter works at a time</h1>
        <br />
    </div>
    <div className="form-group">
        <label className="font-increase-label">Job Title*</label>
        <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange} />
        <br />
    </div>
    <div className="form-group">
        <label className="font-increase-label">Salary*</label>
        <input type="number" id="salary" name="salary" className="form-control" onChange={this.handleInputChange}></input>
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
{/* Shit ends */}