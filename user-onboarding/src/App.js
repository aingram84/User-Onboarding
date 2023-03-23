import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import axios from "axios";
import schema from "./formSchema";
import * as yup from "yup";

function postData() {
  axios.post("https://reqres.in/api/users")
    .then(res => {
      console.log(res.data);
    }).catch(err => console.error(err));
}

const initMemberList = [
  {
    first_name: "Placeholder",
    last_name: "Guy",
    email: "person@home.com",
    password: "strongpassword123",
    tos: "4"
  },
];

const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialDisabled = true


function App() {
  const [memberList, setMemberList] = useState(initMemberList);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    tos: ""
  });

  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewFriend = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
        console.log(res.data)
        setMemberList([res.data, ...memberList])
      })
      .catch((err) => {
        console.error(err)
        setInputValues({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          tos: ""
        })
      })
      .finally(() => setInputValues({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        tos: ""
      }))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const onSubmit = () => {
    setMemberList([inputValues, memberList]);
    const newFriend = {
      first_name: inputValues.first_name.trim(),
      last_name: inputValues.last_name.trim(),
      email: inputValues.email.trim(),
      password: inputValues.password.trim(),
      tos: ["Terms of Service"].filter(terms => !!inputValues[terms])
    }
    setInputValues({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      tos: ""
    });
    postNewFriend(newFriend);
  }
  const onChange = (name, value) => {
    validate(name, value);
    setInputValues({ ...inputValues, [name]: value });
  }

  useEffect(() => {
    schema.isValid(inputValues).then(valid => setDisabled(!valid))
  }, [inputValues])

  return (
    <div className="App">
      {memberList.map((member, idx) => (
        <MemberDetails key={idx} member={member} />
      ))}
      <Form
        inputValues={inputValues}
        change={onChange}
        disabled={disabled}
        errors={formErrors}
        submit={onSubmit} />
    </div>
  );
}

function MemberDetails(props) {
  return (
    <div className="member-details">
      <div className="member-firstname">
        First Name: <em>{props.member.first_name}</em>
      </div>
      <div className="member-lastname">
        Last Name: <em>{props.member.last_name}</em>
      </div>
      <div className="member-email">
        Email: <em>{props.member.email}</em>
      </div>
      <div className="member-password">
        Password: <em>{props.member.password}</em>
      </div>
    </div>
  );
}

export default App;
