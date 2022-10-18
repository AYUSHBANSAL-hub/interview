/** @format */

import { google } from "googleapis";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../logo.png";
export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  console.log(process.env.SHEET_ID);
  const response1 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A2:J10000",
  });
  const response2 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet2!A2:V10000",
  });
  console.log("yeh data aarha", response1.data.values);
  console.log("yeh data aarha second data", response2.data.values);
  const posts1 = response1.data.values;
  const posts2 = response2.data.values;
  console.log(posts1);
  console.log(posts2);
  const arr_sheet1 = [];
  const arr_sheet2 = [];
  posts1.forEach((value) =>
    arr_sheet1.push({
      name: value[0] ?? "",
      email: value[1] ?? "",
      number: value[2] ?? "",
      interview_start_time: value[4] ?? "",
      interviewer_name: value[5] ?? "",
      InterviewStatus: value[9] ?? "",
    })
  );
  posts2.forEach((value) =>
    arr_sheet2.push({
      interviewerName: value[3] ?? "",
      email: value[6] ?? "",
      approach: value[9] ?? "",
      implementation: value[10] ?? "",
      english: value[11] ?? "",
      selectionStatus: value[16] ?? "",
      Remarks0: value[17] ?? "",
      Remarks1: value[18] ?? "",
      Remarks2: value[19] ?? "",
    })
  );

  return {
    props: {
      posts1,
      arr_sheet1,
      arr_sheet2,
    },
  };
}

export default function Post({ posts1, arr_sheet1, arr_sheet2 }) {
  const [email, setEmail] = useState("");
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");

  useEffect(() => {
    if (email) {
      getDetails();
    }
  }, [email]);

  function getDetails() {
    console.log(
      "yo",
      arr_sheet2.filter(function (obj) {
        return obj.email == email;
      })[0]
    );
    setData1(
      arr_sheet1.filter(function (obj) {
        return obj.email == email;
      })[0]
    );
    setData2(
      arr_sheet2.filter(function (obj) {
        return obj.email == email;
      })[0]
    );
  }
  console.log(arr_sheet2);
  return (
    <div>
      <div className="Header">
        <img src="https://iili.io/rQGeuj.md.png" height="40px" />
        <p id="header-text">Interview Portal</p>
      </div>
      <div style={{ display: "flex", height: "30px", alignItems: "center" }}>
        <h2 style={{ marginRight: "10px" }}>Enter Interview Email</h2>
        <input
          type={"text"}
          onChange={(e) => {
            setEmail(e.target.value);
            // getDetails();
          }}
        ></input>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "2px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      ></div>
      <div id="data-row">
        <p id="field">Student Name:</p>
        <p id="response"> {data1?.name}</p>
      </div>
      <div id="data-row">
        <p id="field">Student Number:</p>
        <p id="response"> {data1?.number}</p>
      </div>
      <div id="data-row">
        <p id="field">Interview Date and Time:</p>
        <p id="response">
          {" "}
          {data1?.interview_start_time?.substring(0, 10)} ||{" "}
          {data1?.interview_start_time?.substring(11, 16)} 24Hr Format
        </p>
      </div>

      <div id="data-row">
        <p id="field">Interview Status</p>
        <p id="response"> {data1?.InterviewStatus}</p>
      </div>
      <div id="data-row">
        <p id="field">Interviewer Email:</p>
        <p id="response"> {data1?.interviewer_name}</p>
      </div>
      <div id="data-row">
        <p id="field">interviewer Name:</p>
        <p id="response"> {data2?.interviewerName}</p>
      </div>
      <div id="data-row">
        <p id="field">Approach:</p>
        <p id="response"> {data2?.approach}</p>
      </div>
      <div id="data-row">
        <p id="field">Implementation:</p>
        <p id="response"> {data2?.implementation}</p>
      </div>
      <div id="data-row">
        <p id="field">English:</p>
        <p id="response"> {data2?.english}</p>
      </div>
      <div id="data-row">
        <p id="field">Remarks:</p>
        <p id="response">
          {" "}
          {data2?.Remarks0}
          {data2?.Remarks1}
          {data2?.Remarks2}
        </p>
      </div>
      <div id="data-row">
        <p id="field">Final Verdict:</p>
        <p id="response"> {data2?.selectionStatus}</p>
      </div>
    </div>
  );
}
