import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import axios from "axios";
import schema from "./formSchema";
import * as yup from "yup";

const initMemberList = [
  {
      first_name: "1",
      last_name: "A",
      email: "2",
      password: "B",
      tos: "4"
  },
  {
    first_name: "1",
    last_name: "A",
    email: "2",
    password: "B",
    tos: "4"
  },
];


function App() {
  const [memberList, setMemberList] = useState(initMemberList);
  const [inputValues, setInputValues] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      tos: ""
  });
  const onSubmit = () => {
      setMemberList([inputValues, memberList]);
      setInputValues({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        tos: ""
      });
  }
  const onChange = (name, value) => {
      setInputValues({ ...inputValues, [name]: value });
  }
  return (
    <div className="App">
      {memberList.map((member,idx) => (
                <MemberDetails key={idx} member={member} />
            ))}
      <Form inputValues={inputValues} change={onChange} submit={onSubmit} />
    </div>
  );
}

function MemberDetails(props) {
  return (
      <div className="member-details">
          <div className="member-firstname">
              Name: <em>{props.member.first_name}</em>
          </div>
          <div className="member-lastname">
              Name: <em>{props.member.lasst_name}</em>
          </div>
          <div className="member-email">
              Email: <em>{props.member.email}</em>
          </div>
          <div className="member-password">
              Role: <em>{props.member.password}</em>
          </div>
         </div>
  );
}

export default App;
