import { Button, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
// import { useSpring, animated } from "@react-spring/web";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// import PropTypes from "prop-types";
// import NavHotel from "./NavHotel";

// const Fade = forwardRef(function Fade(props, ref) {
//   const { in: open, children, onEnter, onExited, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter();
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited();
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {children}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element,
//   in: PropTypes.bool.isRequired,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
// };

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1000,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

function ListHotels() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const cols = [
    { field: "name", headerName: "Name", width: "200" },
    {
      field: "rating",
      headerName: "Rating",
      width: "150",
      renderCell: renderRating,
      type: "number",
    },
    { field: "location", headerName: "Location", width: "200" },
    {
      field: "promo",
      headerName: "Promo",
      width: "100",
    },
  ];
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotels/all")
      .then((res) => {
        var j = res.data;
        j.forEach((obj) => renameKey(obj, "_id", "id"));
        setdata(j);
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>List Hotels</h1>
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
        {/* <Button color="primary" variant="contained" onClick={handleOpen}>
          Add Hotel
        </Button>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <NavHotel />
            </Box>
          </Fade>
        </Modal> */}
      </div>
    </div>
  );
}

export default ListHotels;
