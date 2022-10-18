/** @format */

import { google } from "googleapis";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../logo.png";
export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    keyFilename: "../../secrets.json",
    keyFile: "../../secrets.json",
    projectId: "interview-portal-accio",
    credentials: {
      client_email:
        "service-account@interview-portal-accio.iam.gserviceaccount.com",
      client_id: "101448654081665438605",
      client_secret:
        "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCkgcKS1L5lDCL+\nmp1txK4Ir4Q/czorkxmT4i0Fq5jlNSQQ8vmoRD+7XnXkIvZDxxx0mx5b4SwyD/xP\nQKx3shADu4jXsaRGmqTvsUvRhJ4lqsOVoM4zPi6HrE+8GNYpYWYDNWbT1psOm0YY\nDSFl1E3DPKozqiRKOGIm2sgu88odJbasgaCpIYYhnMsG1AOC1A5BdHTw76S6Y78F\nPEz4XIoqqmynRmCgKaXUPMgTVuJO73BH3O4TtLMbp1p8tH/8xPpaBsOfW8O1/JvP\n0z0sn9fYuMFRURZ0CfWVzZe63BpN0vp3DtpaRbqbUDtE6I0585I8+Yg+3p56dxG9\nSEI2+z+tAgMBAAECgf9ur+B7aymwU7o4FVBXyz5OGcqh5qX9K7zKBCTG6+60Sk06\nGkJhNYqsR6KLHfsVH6PF0ZlbuOZDyP27VYi2ANlFqakpeB1QZD0WCfU5xEGkloGC\n6+/SCsTEBOyhYxS2QxKglg3Z+0vZSCChjjQqj+7Crs7WdGR2i/l+qzaGYQJdGS0z\nNgAvMYEqqYWxIK9g11+OuPLltwmmKb/x4ghloh33WtDJ8nH0h6CMohhFxGoEQVgd\nRrC7AaJyqnI9kKtxLi5Mh/bKbevtH+l+xd2nWrtGtBMvkGtz0w707EeNlq1Rcv4S\nZGt0ChjcdCZK5PQi+nqEc13+M3dy0KVyzl0N0VkCgYEA5VAFfLjCzYtHmMmYb8Br\nHC0xSlR7+jZkFg+l2rD3+MR0tPLEtWDWVMISVOoZCW/wB2fEi1UhwJwbRhe1YEbH\nxgkM1dHv3sPIjyw8Iide17IwtTQLtuSWQggVL+5A5nhrPh4XGS7/DTJaKQPYDF/f\nvoaak9ccD4Q4Q/O5oXRh5dUCgYEAt6b2dFmaQqQ0OAeBnKr2gUcF2c5eNmvrvxeS\nw5q+1Z38FGFCh1odUbJKMGv0X7HJvciCMm7E75f+rN7ZW+RI0YOQY3paHaL+ahec\ng4kzDVUSfHzsyW2mN2iXurDvkxb7hhHNCdn3djJEc/pnc80sjMCCDWIV2K2+2UkS\nEM44JnkCgYAldqxe0wSodg/Na2onH8WgBdYesazLlSVG4WmUUANDNj1m7p6qj1aU\n5FwAWXqbqxkI7LAUn2TzRc3C5s6wGwA6X3IkYLcSquPSWES+w7XgAXGpuQYM7E2M\nHivv97nMrXG/5USaza3HpylJuCIM64DvbKhGbQddlZlnqKL0OMJhvQKBgBuV5KcN\nXnJsH7vaxMk3lNdOR76zlMsv4rVNYSoocEm99UNKaKfUDVtcIHCthoNpPRhYqdXR\ndZtXhVWKE7QN0jJGRMXsduTEutpMuaG4VgbGpIQ2b4rCAZmJCGFuek3pwdYdjmLQ\nbq8+VbHmBuwKAYsSz3YbKZTmZChXJXOIxj5hAoGAK4T5FEvX4FUsnuowsmVHBHnI\n6IHV8rKDmItJLg+4L4yRrIq8+coe/I3FQsoQ37WjRGNcc+tCs5Vj+dZwWZy0OyYl\nDMlXGGTmP9BT3H2y0FEprjh62ZpZajGxrYwwVN3TjFq18YnoobIG1Fz/kNjE9Wc2\nsVBamfBtcT4qF1IUPmY=\n-----END PRIVATE KEY-----\n",
    },

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
  const posts1 = response1.data.values;
  const posts2 = response2.data.values;
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
