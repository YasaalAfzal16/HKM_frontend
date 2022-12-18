import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../../../services/hkm_CRUD_API";
import SideBar from "../Sidebar/SideBar";

const DisplayBooks = () => {
  const UserID = useSelector((state) => state.isLogged.user_id);
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
            <SideBar />
          </Grid>
          <Grid
            container
            item
            lg={9}
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {books.map((e) => {
              if (e.User_ID === UserID) {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12} key={e.Book_ID}>
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "lightblue" }}
                    >
                      <Grid item pl={9} pt={3}>
                        <img
                          src={"http://127.0.0.1:8000" + e.BookImage}
                          alt="[no cover]"
                          width="60%"
                          height="auto"
                        />
                      </Grid>
                      <CardHeader
                        title={e.Book_name}
                        subheader={e.Author_name}
                      />
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
              }
            })}
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid container>
          <Grid item lg={2}>
            <SideBar />
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

export default DisplayBooks;
