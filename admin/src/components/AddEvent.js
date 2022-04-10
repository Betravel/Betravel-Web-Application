import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../Redux/eventReducer";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import frLocale from "date-fns/locale/fr";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

function AddEvent() {
  const event = useSelector((state) => state.event);
  const [loading, setLoading] = useState(false);
  const [images, setimages] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  const updateEvent = (e) => {
    dispatch(
      eventActions.updateevent({
        type: e.target.name,
        value: e.target.value,
      })
    );
  };
  const updateDate = (type, value) => {
    dispatch(
      eventActions.updateevent({
        type,
        value,
      })
    );
  };

  const manageProgram = (e, type, index) => {
    e.preventDefault();
    dispatch(eventActions.manageProgram({ type, index }));
  };

  const updateProgram = (value, index, type) => {
    dispatch(
      eventActions.updateProgram({
        index,
        type,
        value,
      })
    );
  };

  const manageNote = (e, type, index) => {
    e.preventDefault();
    dispatch(eventActions.manageNote({ type, index }));
  };

  const updateNote = (value, index) => {
    dispatch(
      eventActions.updateNote({
        index,
        value,
      })
    );
  };
  const onsubmitform = () => {
    const data = new FormData();
    data.append("name", event.name);
    data.append("location", event.location);
    data.append("type", event.type);
    data.append("description", event.description);
    data.append("date", JSON.stringify(event.date));
    data.append("periode", event.periode);
    data.append("price", event.price);
    data.append("program", JSON.stringify(event.program));
    data.append("note", event.note);
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      data.append("images", element);
    }
    data.append("places", event.places);
    axios
      .post("http://localhost:8000/api/event/add", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <br />
      <h4>Add Event</h4>
      <form onSubmit={onsubmitform}>
        <div className="row">
          <div className="col-4">
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={event.name}
              onChange={updateEvent}
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              value={event.location}
              onChange={updateEvent}
              fullWidth
            />
          </div>
          <div className="col-4">
            <FormControl fullWidth>
              <InputLabel id="typelabel">Type</InputLabel>
              <Select
                labelId="typelabel"
                id="type"
                name="type"
                label="Type"
                value={event.type}
                onChange={updateEvent}
              >
                <MenuItem value={"camping"}>Camping</MenuItem>
                <MenuItem value={"circuit"}>Circuit</MenuItem>
                <MenuItem value={"randonne"}>Randonnee</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <br />
        {event.type === "randonne" ? (
          <div className="row">
            <div className="col-4">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
                fullWidth
              >
                <DatePicker
                  mask={"__/__/____"}
                  label="Day"
                  value={event.date.day}
                  onChange={(value) => updateDate("date", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-4">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <TimePicker
                  label="From"
                  value={event.date.from}
                  onChange={(value) => updateDate("fromdate", value)}
                  renderInput={(params) => <TextField {...params} />}
                  shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === "minutes" && timeValue % 5) {
                      return true;
                    }
                    return false;
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="col-4">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <TimePicker
                  label="Until"
                  value={event.date.to}
                  onChange={(value) => updateDate("todate", value)}
                  renderInput={(params) => <TextField {...params} />}
                  shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === "minutes" && timeValue % 5) {
                      return true;
                    }
                    return false;
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-5">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
                fullWidth
              >
                <DatePicker
                  label="From"
                  mask={"__/__/____"}
                  value={event.date.from}
                  onChange={(value) => updateDate("fromdate", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-2">
              <h4>To</h4>
            </div>
            <div className="col-5">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
                fullWidth
              >
                <DatePicker
                  label="Until"
                  mask={"__/__/____"}
                  value={event.date.to}
                  onChange={(value) => updateDate("todate", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        )}
        <br />
        <div className="row">
          <div className="col-12">
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              style={{ width: "100%" }}
              value={event.description}
              onChange={updateEvent}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <h3>Program</h3>
        </div>
        <br />
        {event.program.map((prog, i) => {
          return (
            <div key={i}>
              <div className="row">
                <div className="col-2">
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                    fullWidth
                  >
                    <TimePicker
                      name="programhour"
                      value={prog.hour}
                      onChange={(value) =>
                        updateProgram(value, i, "programhour")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-9">
                  <TextField
                    id="programtext"
                    name="programtext"
                    label="Event"
                    variant="outlined"
                    value={prog.text}
                    onChange={(e) => {
                      updateProgram(e.target.value, i, e.target.name);
                    }}
                    fullWidth
                  />
                </div>
                <div className="col-1">
                  <button
                    className="btn"
                    name="reduce"
                    onClick={(e) => manageProgram(e, "reduce", i)}
                  >
                    <HighlightOffIcon />
                  </button>
                </div>
              </div>
              <br />
            </div>
          );
        })}
        <div className="row">
          <button
            className="btn"
            name="add"
            onClick={(e) => manageProgram(e, "add", 0)}
          >
            Add Pragram Detail
          </button>
        </div>
        <br />
        <div className="row">
          <h3>Note</h3>
        </div>
        <br />
        {event.note.map((n, i) => {
          return (
            <div key={i}>
              <div className="row">
                <div className="col-11">
                  <TextField
                    id="note"
                    name="note"
                    label="Note"
                    variant="outlined"
                    value={n}
                    onChange={(e) => {
                      updateNote(e.target.value, i);
                    }}
                    fullWidth
                  />
                </div>
                <div className="col-1">
                  <button
                    className="btn"
                    name="reduce"
                    onClick={(e) => manageNote(e, "reduce", i)}
                  >
                    <HighlightOffIcon />
                  </button>
                </div>
              </div>
              <br />
            </div>
          );
        })}
        <div className="row">
          <button
            className="btn"
            name="add"
            onClick={(e) => manageNote(e, "add", 0)}
          >
            Add A Note
          </button>
        </div>
        <br />
        <div className="row">
          <div className="col-4">
            <h4>Price</h4>
          </div>
          <div className="col-2">
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              value={event.price}
              onChange={updateEvent}
              fullWidth
            />
          </div>
          <div className="col-4">
            <h4>Available Places</h4>
          </div>
          <div className="col-2">
            <TextField
              id="places"
              name="places"
              label="Places"
              variant="outlined"
              type="number"
              value={event.places}
              onChange={updateEvent}
              fullWidth
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <input
              id="images"
              label="image"
              type="file"
              multiple
              variant="filled"
              accept="image/png,image/jpg"
              onChange={(e) => setimages(e.target.files)}
            />
          </div>
        </div>
        <br />
        <LoadingButton
          color="secondary"
          onClick={(e) => {
            setLoading(true);
            onsubmitform(e);
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
      </form>
    </div>
  );
}
export default AddEvent;
