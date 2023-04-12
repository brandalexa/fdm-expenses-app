import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ViewUnsentClaims = () => {
  const claims = [ // Boilerplate - will be replaced with JSON from DB
    { title: "Claim 1", description: "Description 1", amount: "£42.99", date: "2022-04-01" },
    { title: "Claim 2", description: "Description 2", amount: "£100.00", date: "2022-04-02" },
    { title: "Claim 3", description: "Description 3", amount: "£17.99", date: "2022-04-03" },
  ];

  const handleClick = (title) => {
    alert(title); // Will link to relevant claim
  };

  return (
    <TableContainer component={Paper}>
        <h1>Unsent Claims</h1>
      <Table sx={{ minWidth: 650 }} aria-label="Claims table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <TableRow
              key={claim.title}
              onClick={() => handleClick(claim.title)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <TableCell component="th" scope="row">
                {claim.title}
              </TableCell>
              <TableCell>{claim.description}</TableCell>
              <TableCell>{claim.amount}</TableCell>
              <TableCell>{claim.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewUnsentClaims;