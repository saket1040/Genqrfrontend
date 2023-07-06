import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alighItems: "center",
    padding: 20,
    background: "#00897b",
    color: "white",
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

function QrCode() {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");

  const generateQrcode = (e) => {
    e.preventDefault();
    axios
      .post("https://genback.onrender.com/api/scanQrcode", { url: url })
      .then((response) => {
        //console.log(response);
        setQrImage(response.data);
      });
  };
  return (
    <div>
      <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>Generate and Download Link QR code </h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter text here"
                  onChange={(e) => {
                    setQrImage("");
                    setUrl(e.target.value)
                  }}
                  value={url}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={generateQrcode}
                >
                  Generate-QRcode
                </Button>
                <br />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                {url.length > 0 && qrImage ? (
                  <>
                    <a href={qrImage} download>
                      <img src={qrImage} alt="" />
                    </a>
                    <p>Scan the QR Code to access data!</p>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <NavLink to="/image">
          <Button variant="outlined" color="primary" className={classes.btn}>
            Image QR Code
          </Button>
        </NavLink>
      </Container>
    </div>
  );
}

export default QrCode;
