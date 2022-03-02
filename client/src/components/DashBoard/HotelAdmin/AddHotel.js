import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import "./AddHotel.css";
function AddHotel() {
  const destination = [{ label: "Hammamet" }];
  return (
    <div>
      <h4>Add hotel</h4>
      <div className="row">
        <div className="col-6">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="col-6">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={destination}
            sx={{ width: "auto" }}
            renderInput={(params) => (
              <TextField {...params} label="Location" fullWidth />
            )}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="col-6">
          <Rating name="size-medium" defaultValue={1} />
        </div>
      </div>
      <br />

      <div className="row">
        <input type="file" name="file" multiple id="file" class="inputfile" />
        <label for="file">
          <button className="btn btn-primary">
            {" "}
            <img
              src="https://img.icons8.com/office/18/000000/downloads-folder.png"
              alt=""
            />{" "}
            Choose images
          </button>
        </label>
      </div>
      <br />
      <button className="btn btn-primary">Add</button>
    </div>
  );
}

export default AddHotel;
