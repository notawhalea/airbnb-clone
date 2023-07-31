import PhotoUploader from "../PhotoUploader.jsx";
import Perks from "../Perks.jsx";
import { useState } from "react";
import axios from "axios";
import AccountNavigation from "../AccountNavigation.jsx";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  async function addNewPlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData);
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AccountNavigation />
      <form onSubmit={addNewPlace}>
        {inputHeader("Title")}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          required={true}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        {inputHeader("Address")}
        <input
          type="text"
          placeholder="address"
          required={true}
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {inputHeader("Photos")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {inputHeader("Description")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {inputHeader("Perks")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {inputHeader("Extra info")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {inputHeader("Check in&out times")}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="17:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="number"
              placeholder="5"
            />
          </div>
        </div>
        <button className="primary mt-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
