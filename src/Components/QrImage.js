import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Grid,
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

function QrImage() {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [image, setImage] = useState("");

  const onPhoto = (e) => {
    setImage(e.target.files[0]);
  };

  const generateQrcode = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qr_code");
    data.append("cloud_name", "di6pbmou2");
    data.append("API_KEY", "344268186598145");

    const resp = await fetch(
      "  https://api.cloudinary.com/v1_1/di6pbmou2/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const respoJSON = await resp.json();
    setUrl(respoJSON.url);
    //console.log(respoJSON);
    //console.log(url);

    axios
      .post("https://genback.onrender.com/api/scanQrcode", {
        url: respoJSON.url,
      })
      .then((response) => {
        //console.log(response);
        setQrImage(response.data);
      });
  };
  return (
    <div>
      <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>Generate and Download Image QR code</h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <div className="mb-1">
                  <label
                    htmlFor="image"
                    className="form-label"
                    style={{ fontSize: "14px" }}
                  >
                    Upload image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={onPhoto}
                  />
                </div>
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
        <NavLink to="/">
          <Button variant="outlined" color="primary" className={classes.btn}>
            Link QR Code
          </Button>
        </NavLink>
      </Container>
    </div>
  );
}
export default QrImage;
