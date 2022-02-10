import CommingSoon from "./CommingSoon/CommingSoon";
import SearchFormHotel from "./SearchForm/SearchFormHotel";

function Search() {
  return (
    <div
      className="container"
      style={{ borderStyle: "double", backdropFilter: "blur(15px)" }}
    >
      <br />
      <nav>
        <div
          className="nav nav-tabs"
          id="nav-tab"
          role="tablist"
          style={{
            backgroundColor: "tranparent",
            border: "2px  ",
            borderRadius: " 5px",
            padding: "5px",
          }}
        >
          <button
            className="nav-link active"
            id="nav-hotel-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-hotel"
            type="button"
            role="tab"
            aria-controls="nav-hotel"
            aria-selected="true"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/4-star-hotel.png"
              alt=""
            />
            <br />
            Hotels
          </button>
          <button
            className="nav-link"
            id="nav-avion-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-avion"
            type="button"
            role="tab"
            aria-controls="nav-avion"
            aria-selected="false"
          >
            <img
              src="https://img.icons8.com/external-gradak-royyan-wijaya/24/000000/external-airport-gradak-travel-gradak-royyan-wijaya-6.png"
              alt=""
            />
            <br />
            Avion
          </button>
          <button
            className="nav-link"
            id="nav-bateau-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-bateau"
            type="button"
            role="tab"
            aria-controls="nav-bateau"
            aria-selected="false"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/cruise-ship.png"
              alt=""
            />
            <br />
            Bateau
          </button>
        </div>
      </nav>
      <br />
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-hotel"
          role="tabpanel"
          aria-labelledby="nav-hotel-tab"
        >
          <SearchFormHotel />
        </div>
        <div
          className="tab-pane fade"
          id="nav-avion"
          role="tabpanel"
          aria-labelledby="nav-avion-tab"
        >
          <CommingSoon />
        </div>
        <div
          className="tab-pane fade"
          id="nav-bateau"
          role="tabpanel"
          aria-labelledby="nav-bateau-tab"
        >
          <CommingSoon />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Search;
