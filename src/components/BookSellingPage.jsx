import {
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useSaveBookInfoMutation,
  useGetAllBooksQuery,
  useGetAllUsersQuery,
} from "../services/hkm_CRUD_API";
import { useSelector } from "react-redux";

const BookSellingPage = () => {
  const UserID = useSelector((state) => state.isLogged.user_id);
  const [usr_nm, set_usr_nm] = useState("");

  // const [books, setBooks] = useState([]);
  //Style for Uploading-book-images:
  const Input = styled("input")({ display: "none" });
  const [categ, setCateg] = useState("");
  const [binding, setBinding] = useState("");
  const [condition, setCondition] = useState("");
  const [bkImg, setBkImg] = useState([]);
  const [bkFile, setBkFile] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const navigate = useNavigate();
  const navToReq = () => {
    navigate("/request");
  };
  const navToHome = () => {
    navigate("/");
  };

  // RTK Query
  const User_responseInfo = useGetAllUsersQuery();
  const responseInfo = useGetAllBooksQuery();
  const [saveBookInfo] = useSaveBookInfoMutation();

  const currUsrName = (backEnd_data, usr_id) => {
    return backEnd_data.find((e) => {
      if (e.User_ID === usr_id) {
        // const fullName = [e.fname, e.lname].join(" ");
        return e;
      }
    });
  };

  useEffect(() => {
    if (!responseInfo.isLoading) {
      // setBooks(responseInfo.data);
      console.log(responseInfo.data);
      const getUserName = currUsrName(User_responseInfo.data, UserID);
      set_usr_nm(getUserName.fname + " " + getUserName.lname);
      console.log(usr_nm);
    }
  }, [responseInfo.isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      User_ID: UserID,
      Book_name: data.get("bk-name"),
      Seller_name: usr_nm,
      Author_name: data.get("author-name"),
      Publisher_name: data.get("publisher-name"),
      Book_price: data.get("bk-price"),
      Book_pages: data.get("bk-pages"),
      Category: categ,
      Binding: binding,
      Condition: condition,
      BookImage: bkImg,
      BookFile: bkFile,
    };
    if (
      actualData.User_ID &&
      actualData.Book_name &&
      actualData.Seller_name &&
      actualData.Author_name &&
      actualData.Publisher_name &&
      actualData.Book_price !== null &&
      actualData.Book_pages !== null &&
      actualData.Category &&
      actualData.Binding &&
      actualData.Condition &&
      actualData.BookImage &&
      actualData.BookFile
    ) {
      // console.log(actualData);
      let fd = new FormData();
      fd.append("User_ID", actualData.User_ID);
      fd.append("Book_name", actualData.Book_name);
      fd.append("Seller_name", actualData.Seller_name);
      fd.append("Author_name", actualData.Author_name);
      fd.append("Publisher_name", actualData.Publisher_name);
      fd.append("Book_price", actualData.Book_price);
      fd.append("Book_pages", actualData.Book_pages);
      fd.append("Category", actualData.Category);
      fd.append("Binding", actualData.Binding);
      fd.append("Condition", actualData.Condition);
      fd.append("BookImage", actualData.BookImage);
      fd.append("BookFile", actualData.BookFile);

      const res = await saveBookInfo(fd);

      console.log("Response: ", res);

      // async function AddBookInfo() {
      //   try {
      //     console.log("In POST function ...");

      // const config = {
      //   mode: "no-cors",
      //   method: "POST",
      //   url: "http://127.0.0.1:8000/api/book/",
      //   body: fd,
      //   headers: { "Content-Type": "multipart/form-data" },
      //....................
      // data: JSON.stringify({
      //   Book_name: actualData.Book_name,
      //   Author_name: actualData.Author_name,
      //   Publisher_name: actualData.Publisher_name,
      //   Book_price: actualData.Book_price,
      //   Book_pages: actualData.Book_pages,
      //   Category: actualData.Category,
      //   Binding: actualData.Binding,
      //   Condition: actualData.Condition,
      //   BookImage: actualData.BookImage,
      //   BookFile: actualData.BookFile,
      // }),
      // };

      //     const response = await axios(config);
      //     console.log(response.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // AddBookInfo();
      document.getElementById("book-selling-form").reset();
      setError({
        status: true,
        msg: "Book`s registration successful !!! ",
        type: "success",
      });
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };

  // async function getAllBooks() {
  //   try {
  //     const booKs = await axios.get("http://127.0.0.1:8000/api/book/");
  //     console.log(booKs.data);
  //     setBooks(booKs.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getAllBooks();
  // }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item lg={6} sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="book-selling-form"
            onSubmit={handleSubmit}
          >
            <h1>Enter book details</h1>
            <TextField
              disabled
              fullWidth
              id="user-id"
              name="user-id"
              label="Seller ID"
              margin="normal"
              value={UserID}
            />
            <TextField
              disabled
              fullWidth
              id="seller-name"
              name="seller-name"
              label="Seller`s Name"
              margin="normal"
              value={usr_nm}
            />

            <TextField
              required
              fullWidth
              id="bk-name"
              name="bk-name"
              label="Name of the book"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="author-name"
              name="author-name"
              label="Author`s name"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="publisher-name"
              name="publisher-name"
              label="Publisher`s name"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="bk-price"
              name="bk-price"
              label="Book price "
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="bk-pages"
              name="bk-pages"
              label="Book pages "
              margin="normal"
            />
            <FormControl required fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={categ}
                label="categ"
                onChange={(e) => {
                  setCateg(e.target.value);
                }}
              >
                <MenuItem value="Classics">Classics</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="NonFiction">NonFiction</MenuItem>
                <MenuItem value="Detective">Detective</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Comic">Comic</MenuItem>
                <MenuItem value="ChildrenBook">ChildrenBook</MenuItem>
                <MenuItem value="UrduBook">UrduBook</MenuItem>
              </Select>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <FormLabel id="binding-radio">Binding</FormLabel>
              <RadioGroup
                row
                name="bindingRadGrp"
                aria-labelledby="binding-radio"
                value={binding}
                onChange={(e) => {
                  setBinding(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Paperback"
                  control={<Radio />}
                  label="Paperback"
                />
                <FormControlLabel
                  value="Hardback"
                  control={<Radio />}
                  label="Hardback"
                />
              </RadioGroup>
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <FormLabel id="condition-radio">Condition</FormLabel>
              <RadioGroup
                row
                name="bindingRadGrp"
                aria-labelledby="binding-radio"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Used"
                  control={<Radio />}
                  label="Used"
                />
                <FormControlLabel value="New" control={<Radio />} label="New" />
              </RadioGroup>
            </FormControl>

            <Stack direction="row" alignItems="center" spacing={4} pl={15}>
              <label htmlFor="book-photos">
                <Input
                  accept=".jpg,.png"
                  id="book-photos"
                  type="file"
                  onChange={(e) => {
                    setBkImg(e.target.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload Book Pics
                </Button>
              </label>
              <label htmlFor="book-pdf-file">
                <Input
                  accept=".pdf,.docx"
                  id="book-pdf-file"
                  type="file"
                  onChange={(e) => {
                    setBkFile(e.target.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload Book PDF/DOCX
                </Button>
              </label>
            </Stack>

            <Box textAlign="center">
              {error.status ? (
                <Alert severity={error.type}>{error.msg}</Alert>
              ) : (
                ""
              )}
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SUBMIT
              </Button>
            </Box>
            <Box textAlign="center">
              <Button
                variant="outlined"
                color="warning"
                sx={{ mt: 3, mb: 2, px: 5 }}
                onClick={navToReq}
              >
                Request a Book
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{ ml: 14, mt: 3, mb: 2, px: 5 }}
                onClick={navToHome}
              >
                BACK
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BookSellingPage;
