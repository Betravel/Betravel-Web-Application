import CommingSoon from "./CommingSoon/CommingSoon";
import SearchFormDemo from "./SearchForm/SearchFormDemo";

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
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-hotel-hotel-kiranshastry-lineal-kiranshastry.png" />
            <br />
            Hotels
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            <img src="https://img.icons8.com/external-itim2101-lineal-itim2101/64/000000/external-airplane-travel-itim2101-lineal-itim2101-1.png" />
            <br />
            Avion
          </button>
          <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-ship-advertising-kiranshastry-lineal-kiranshastry.png" />
            <br />
            Bateau
          </button>
        </div>
      </nav>
      <br />
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <SearchFormDemo />
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <CommingSoon />
        </div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <CommingSoon />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Search;
