import React, { Component } from "react";

import { Form, Button, Container } from "react-bootstrap";
import Axios from "axios";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nric: "",
      displayVacinneStatus: null,
      vacinneStatusMessage: [],
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
          vacinneStatusMessage: ["Check in fail", "user not found"],
        });
      } else if (vaccineStatus === true) {
        this.setState({
          vacinneStatusMessage: ["Check in Success", "you are vaccinated"],
        });
      } else if (vaccineStatus === false) {
        this.setState({
          vacinneStatusMessage: ["Check in Success", "you are not vaccinated"],
        });
      } else {
        this.setState({
          vacinneStatusMessage: ["Check in fail", res.data["message"]],
        });
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Form.Group className="mb-3" controlId="formBasicNric">
          <Form.Label>NRIC</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter nric"
            name="nric"
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your nric with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" onClick={this.handleSubmit}>
          Submit
        </Button>

        {this.state.vacinneStatusMessage ? (
          this.state.vacinneStatusMessage.map((item) => <p>{item}</p>)
        ) : (
          <p></p>
        )}
      </Container>
    );
  }
}

export default FormContainer;
