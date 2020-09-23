import React from "react";
import { render } from "react-dom";
import "./Footer.css"

function Footer() {
    return (
      <div className="main-footer">
        <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <div className="head-footer">JOBWARE</div>
            <div className="list-unstyled">
              <li>+91 172123314</li>
              <li>Shaitan Gali, Khatra Mahal,</li>
              <li>Andher Nagar (Shamshaan ke saamne)</li>
            </div>
          </div>
          {/* Column2 */}
          <div className="col">
          <div className="head-footer">STUFF</div>
            <ui className="list-unstyled">
              <li>DANK MEMES</li>
              <li>OTHER STUFF</li>
              <li>GUD STUFF</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
          <div className="head-footer">WELL ANOTHER COLUMN</div>
            <ui className="list-unstyled">
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;2020 JOBLELE | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
      </div>
    );
  }
  

export default Footer;