import React, { Component } from "react";

import { Form, Button, Container } from "react-bootstrap";
import Axios from "axios";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nric: "",
      displayVacinneStatus: null,
      vacinneStatusMessage: "",
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

    Axios({
      method: "post",
      url: "http://localhost:8080/api/checkin",
      headers: { "Content-Type": "application/json" },
      data: data,
    }).then((res) => {
      console.log(res.data);
      let vaccineStatus = res.data["vaccineStatus"];
      if (vaccineStatus === "not found") {
        this.setState({
          vacinneStatusMessage: "user not found",
        });
      } else if (vaccineStatus === true) {
        this.setState({
          vacinneStatusMessage: "you are vaccinated",
        });
      } else if (vaccineStatus === false) {
        this.setState({
          vacinneStatusMessage: "you are not vaccinated",
        });
      } else {
        this.setState({
          vacinneStatusMessage: "error",
        });
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Form>
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
        </Form>
        {this.state.vacinneStatusMessage}
      </Container>
    );
  }
}

export default FormContainer;
