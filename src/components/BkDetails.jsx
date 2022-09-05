import { Button, Grid, Rating } from "@mui/material";
import { useState } from "react";
import "../scss/_bkDetails.scss";


const BkDetails = ({ show, item }) => {
  if (!(show)) {
    return null;
  }

  let thumbNail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
  let tiTle = item.volumeInfo && item.volumeInfo.title;
  let autHor = item.volumeInfo && item.volumeInfo.authors;
  let paGes = item.volumeInfo && item.volumeInfo.pageCount;
  let pubLisher = item.volumeInfo && item.volumeInfo.publisher;
  let dateOfPublish = item.volumeInfo && item.volumeInfo.publishedDate;
  let avgRating = item.volumeInfo && item.volumeInfo.averageRating;
  let deScription = item.volumeInfo && item.volumeInfo.description;

  return (
    <div className="overlay">
      <div className="overlay-inner">

        <div className="inner-box">
        <Grid container spacing={5} p={5} >
            <Grid lg={6} md={6} sm={6} xs={6}>
                <img src={thumbNail} alt={tiTle} />
                <Grid>
                <Rating value={avgRating} readOnly precision={0.5} />
                </Grid>
            </Grid>
            
            <Grid lg={6} md={6} sm={6} xs={6}>
                <h2 >{tiTle}</h2>
                {/* <h3 >{autHor}</h3> */}
                {autHor.map((author,i)=><h4  key={i}>{autHor.length>=2?`${i+1}'.'`:''}{author}</h4>)}
                <h6>Pages: {paGes}</h6>
                <h6>
                {pubLisher} | <span>{dateOfPublish}</span>
                </h6>
                <Button variant="contained" color="error" href='/'>Back</Button>
                
            </Grid>
            <Grid>
            <hr/><hr/>
            <h5><bold>Description</bold></h5>
                {deScription}
            </Grid>
        </Grid>
          
        </div>
      </div>
    </div>
    

  );
};

export default BkDetails;
