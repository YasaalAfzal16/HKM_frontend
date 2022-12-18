import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllBooksQuery } from "../../services/hkm_CRUD_API";
import Sidebar from "../components/sidebar/Sidebar";

const DisplayBooksAdmin = () => {
  const responseInfo = useGetAllBooksQuery();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!responseInfo.isLoading) {
      setBooks(responseInfo.data);
    }
  }, [responseInfo.isLoading]);
  console.log("Response Info:", books);

  if (books.length > 0) {
    return (
      <>
        <Grid container>
          <Grid item lg={2}>
            <Sidebar />
          </Grid>
          <Grid
            container
            item
            lg={9}
            spacing={2}
            px={2}
            pt={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {books.map((e) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12} key={e.Book_ID}>
                  <Card
                    variant="outlined"
                    style={{ backgroundColor: "lightblue" }}
                  >
                    {/* <CardMedia src={thumbNail} style={{height: 0, paddingTop: '56%' }}/> */}
                    <Grid item pl={9} pt={3}>
                      <img
                        src={"http://127.0.0.1:8000" + e.BookImage}
                        alt="[no cover]"
                        width="60%"
                        height="auto"
                      />
                    </Grid>
                    <CardHeader title={e.Book_name} subheader={e.Author_name} />
                    <CardContent>
                      <hr />
                      <div>
                        <ul>
                          <li>{"Seller: " + e.Seller_name}</li>
                          <hr />
                          <li>{"Pages: " + e.Book_pages}</li>
                          <hr />
                          <li>{"Publisher: " + e.Publisher_name}</li>
                          <hr />
                          <li>{"Price: Rs." + e.Book_price}</li>
                          <hr />
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {/* <BkDetails show={show} item={bookItem} /> */}
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid container>
          <Grid item lg={2}>
            <Sidebar />
          </Grid>
          <Grid item>
            <Box sx={{ mx: 9, my: 9 }}>
              <h3>You currently have no books ...</h3>;
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default DisplayBooksAdmin;
