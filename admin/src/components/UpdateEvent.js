import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvent, eventActions } from "../Redux/eventReducer";
function UpdateEvent() {
  const event = useSelector((state) => state.event);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [images, setimages] = useState([]);
  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);
  return <div></div>;
}

export default UpdateEvent;
