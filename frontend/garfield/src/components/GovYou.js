import React, { Component, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Axios from "axios";

import safeEntryDefault from "./img/safeentry_default.png";
import safeEntryError from "./img/safeentry_error.png";
import safeEntryNotVaccinated from "./img/safeentry_notvaccinated.png";
import safeEntryVaccinated from "./img/safeentry_vaccinated.png";
import traceTogether from "./img/tracetogether.png";

import "./GovYou.css";

class GovYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nric: "",
      displayVaccineStatus: null,
      vaccineStatusMessage: [],
      vaccineStatus: "default",
      position: "top-end",
    };
  }

  handleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    console.log(val);
    console.log(nam);
    this.setState({ [nam]: val });
  };

  handleSubmit = (e) => {
    let data = {
      nric: this.state.nric,
    };

    console.log(data);

    let api_url = "https://todo-fddthxsyrq-as.a.run.app/api/checkin";
    // let api_url = "http://localhost:8080/api/checkin";

    Axios({
      method: "post",
      url: api_url,
      headers: { "Content-Type": "application/json" },
      data: data,
    }).then((res) => {
      console.log(res.data);
      let vaccineStatus = res.data["vaccineStatus"];
      if (vaccineStatus === "not found") {
        this.setState({
          vaccineStatusMessage: [
            "Check In Fail",
            "No Vaccination Record Found",
          ],
          vaccineStatus: "red",
        });
      } else if (vaccineStatus === true) {
        this.setState({
          vaccineStatusMessage: ["Check In Success", "You are Vaccinated"],
          vaccineStatus: "green",
        });
      } else if (vaccineStatus === false) {
        this.setState({
          vaccineStatusMessage: ["Check In Success", "You are NOT Vaccinated"],
          vaccineStatus: "orange",
        });
      } else {
        this.setState({
          vaccineStatusMessage: ["Check In Fail", res.data["message"]],
          vaccineStatus: "red",
        });
      }
    });
  };
  // no sound de
  render() {
    let displaySafeEntry;

    if (this.state.vaccineStatus == "green") {
      displaySafeEntry = safeEntryVaccinated;
    } else if (this.state.vaccineStatus == "orange") {
      displaySafeEntry = safeEntryNotVaccinated;
    } else if (this.state.vaccineStatus == "red") {
      displaySafeEntry = safeEntryError;
    } else {
      displaySafeEntry = safeEntryDefault;
    }

    return (
      <div>
        {this.state.vaccineStatusMessage ? (
          <ToastContainer className="p-3" position={this.state.position}>
            <Toast>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Vaccine Info</strong>
              </Toast.Header>
              <Toast.Body>
                {this.state.vaccineStatusMessage ? (
                  this.state.vaccineStatusMessage.map((item) => <p>{item}</p>)
                ) : (
                  <p></p>
                )}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        ) : (
          <></>
        )}
        <table>
          <tr scope="col">
            <td>
              <table>
                <tr>
                  <td>
                    <img
                      src={displaySafeEntry}
                      alt="VaccineStatus"
                      height="1200px"
                    />
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <table>
                <tr scope="col">
                  <td>
                    <Container>
                      <Form.Control
                        type="text"
                        placeholder="Enter NRIC"
                        name="nric"
                        onChange={this.handleChange}
                      />
                      <p></p>
                      <div className="d-grid gap-2">
                        <Button variant="primary" onClick={this.handleSubmit}>
                          Submit
                        </Button>
                      </div>
                    </Container>
                    <p></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={traceTogether} alt="App" height="600px" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default GovYou;
