import { Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

function ListHotels() {
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
      valueFormatter: ({ value }) => value.status,
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
      </div>
    </div>
  );
}

export default ListHotels;
