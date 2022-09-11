import { Image } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Rating,
} from "@mui/material";
import { useState } from "react";
import BkDetails from "./BkDetails";

// import  "../scss/_displaySrchBook.scss"
const DisplaySrchBook = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  return (
    <>
      <Grid container spacing={2} p={7}>
        {book.map((item) => {
          let id = item.id;
          let thumbNail =
            item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
          let tiTle = item.volumeInfo && item.volumeInfo.title;
          let autHor = item.volumeInfo && item.volumeInfo.authors;
          let paGes = item.volumeInfo && item.volumeInfo.pageCount;
          let pubLisher = item.volumeInfo && item.volumeInfo.publisher;
          let avgRating = item.volumeInfo && item.volumeInfo.averageRating;
          let subTitle = item.volumeInfo && item.volumeInfo.subtitle;

          return (
            <>
              <Grid item lg={3} md={4} sm={6} xs={12} p={3} key={id}>
                <Card
                  variant="outlined"
                  style={{ backgroundColor: "lightblue" }}
                >
                  {/* <CardMedia src={thumbNail} style={{height: 0, paddingTop: '56%' }}/> */}
                  <Grid item pl={9} pt={3}>
                    <img
                      src={thumbNail}
                      alt="[no cover]"
                      width="60%"
                      height="auto"
                    />
                  </Grid>
                  <CardHeader
                    title={tiTle}
                    subheader={(autHor ?? ["[No Author mentioned]"])[0]}
                  />
                  <CardContent>
                    <Rating value={avgRating} readOnly precision={0.5} />
                    <hr />
                    <div>
                      <ul>
                        <li>{subTitle}</li>
                        {subTitle ? <hr /> : ""}
                        <li>Pages: {paGes}</li>
                        <hr />
                        <li>Publisher: {pubLisher}</li>
                        <hr />
                      </ul>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setShow(true);
                        setItem(item);
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <BkDetails show={show} item={bookItem} />
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default DisplaySrchBook;
