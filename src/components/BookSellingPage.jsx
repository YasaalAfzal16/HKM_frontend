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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookSellingPage = () => {
    //Style for Uploading-book-images:
    const Input=styled('input')({display:"none"});
  const [categ, setCateg] = useState("");
  const [binding, setBinding]=useState("");
  const [condition, setCondition]=useState("");
  const [bkImg, setBkImg]=useState([])
  const [bkFile, setBkFile]=useState("")
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      Book_name: data.get("bk-name"),
      Author_name: data.get("author-name"),
      Publisher_name: data.get("publisher-name"),
      Book_price: data.get("bk-price"),
      Book_pages: data.get("bk-pages"),
      Category:categ,
      Binding:binding,
      Condition:condition,
      BookImage:bkImg,
      BookFile:bkFile

    };
    if (
      actualData.Book_name &&
      actualData.Author_name &&
      actualData.Publisher_name &&
      actualData.Book_price !== null
    ) {
        console.log(actualData);
        document.getElementById("book-selling-form").reset();
        setError({
          status: true,
          msg: "Book`s registration successful !!! ",
          type: "success",
        });
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };

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
            <FormControl required fullWidth margin="normal" >
                <FormLabel id="binding-radio">Binding</FormLabel>
                <RadioGroup row  name="bindingRadGrp" aria-labelledby="binding-radio" value={binding} onChange={(e)=>{setBinding(e.target.value)}}>
                    <FormControlLabel value="Paperback" control={<Radio/>} label="Paperback"/>
                    <FormControlLabel value="Hardback" control={<Radio/>} label="Hardback"/>
                </RadioGroup>
            </FormControl>

            <FormControl required fullWidth margin="normal" >
                <FormLabel id="condition-radio">Condition</FormLabel>
                <RadioGroup row  name="bindingRadGrp" aria-labelledby="binding-radio" value={condition} onChange={(e)=>{setCondition(e.target.value)}}>
                    <FormControlLabel value="Used" control={<Radio/>} label="Used"/>
                    <FormControlLabel value="New" control={<Radio/>} label="New"/>
                </RadioGroup>
            </FormControl>

            <Stack direction="row" alignItems="center" spacing={4} pl={15}>
                <label htmlFor="book-photos" >
                    <Input accept=".jpg,.png" id="book-photos" type="file" onChange={(e)=>{setBkImg(e.target.files)}}/>
                    <Button variant="contained" component="span">Upload Book Pics</Button>
                </label>
                <label htmlFor="book-pdf-file">
                    <Input accept=".pdf,.docx" id="book-pdf-file" type="file" onChange={(e)=>{setBkFile(e.target.files)}} />
                    <Button variant="contained" component="span">Upload Book PDF/DOCX</Button>
                </label>
            </Stack>


            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SUBMIT
              </Button>
            </Box>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BookSellingPage;
