import React, { useState, useEffect, isVisible, setIsVisible } from "react";
import { getEmployeeClaims } from "../../firebase";
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ViewUnsentClaims = () => {

  const [isVisible, setIsVisible] = useState(false);


  const oldClaims = [ // Boilerplate - will be replaced with JSON from DB
    { title: "User 1", description: "Joe Max", amount: "£420", date: "2015-07-01" },
    { title: "User 2", description: "Bingfan Xu", amount: "£500", date: "2015-02-03" },
    { title: "User 3", description: "Hex Lenin", amount: "£3000", date: "2015-05-07" },
  ];

  // List of claim objects where Sent != true;
  const [employeeClaims, setEmployeeClaims] = useState([]);

  async function updateClaims() {
    let claims = await getEmployeeClaims();
    // Ensures that all claims to be managed have been submitted and not yet resolved
    claims = claims.filter((claim) => {
        return claim[Object.keys(claim)[0]].Sent === true && claim[Object.keys(claim)[0]].Resolved === false;
      });
    console.log(claims);
    setEmployeeClaims(claims);
  }

  // Approves/Rejects a claim and resolves it
  function approveClaim(claimID, isApproved) {

  }

  useEffect(() => {
    updateClaims();
  }, []);

  const claims = employeeClaims;

  const handleClick = (title) => {
    setIsVisible(true);
  };

  return (
    <>
    <TableContainer component={Paper}>
        <h1>Pending Claims</h1>
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
              key={Object.keys(claim)[0]}
              onClick={() => handleClick(claim[Object.keys(claim)[0]].Title)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <TableCell component="th" scope="row">
                {claim[Object.keys(claim)[0]].Title}
              </TableCell>
              <TableCell>{claim[Object.keys(claim)[0]].Description}</TableCell>
              <TableCell>{"£" + claim[Object.keys(claim)[0]].Amount}</TableCell>
              <TableCell>{claim[Object.keys(claim)[0]].Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {isVisible && (
    <form>
            <div id="form-buttons">
            <Button variant="contained" color="success" type="submit" className="form-button">Approve</Button>
            <Button variant="contained" color="error" className="form-button">Deny</Button>
          </div>
          </form>
    )
}
</>
  );
};

export default ViewUnsentClaims;