import axios from "axios";
import { useEffect, useState } from "react";

function TotalHotel(props) {
  const [price, setprice] = useState(0);
  useEffect(() => {
    const rooms = props.room;
    console.log(rooms);
    axios
      .get("http://localhost:8000/api/hotel/price/" + props.id, rooms)
      .then((res) => {
        console.log(res.data);
        if (props.type === "single") {
          setprice(res.data.totalsingle);
        } else if (props.type === "double") {
          setprice(res.data.totaldouble);
        } else if (props.type === "triple") {
          setprice(res.data.totaltriple);
        }
      })
      .catch((err) => console.log(err));
  });
  return <div>{price}</div>;
}

export default TotalHotel;
