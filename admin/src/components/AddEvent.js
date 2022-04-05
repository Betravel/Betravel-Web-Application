import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../Redux/eventReducer";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import frLocale from "date-fns/locale/fr";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function AddEvent() {
  const event = useSelector((state) => state.event);
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
  const onsubmitform = () => {};
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
        <div className="row">
          <div className="col-5">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={frLocale}
              fullWidth
            >
              <DateTimePicker
                name="fromdate"
                renderInput={(props) => <TextField {...props} />}
                label="From"
                value={event.date[0]}
                onChange={(value) => updateDate("fromdate", value)}
                fullWidth
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
              <DateTimePicker
                name="todate"
                renderInput={(props) => <TextField {...props} />}
                label="To"
                value={event.date[1]}
                onChange={(value) => updateDate("todate", value)}
                fullWidth
              />
            </LocalizationProvider>
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
      </form>
    </div>
  );
}
export default AddEvent;
