export const customStyles = {
  control: (provided: {}) => ({
    ...provided,
    background: "#fff",
    border: "1px solid #FDFDFE !important",
    minHeight: "35px",
    height: "35px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "&:focus": {
      border: "0 !important",
      outline: "none",
    },
  }),
  option: (provided: {}) => ({
    ...provided,
    minHeight: "35px",
    height: "35px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    height: "35px",
    padding: "0 6px",
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "#f2f2f2",
    margin: "0px",
    svg: {
      fill: "#181818",
      backgroundColor: "none",
    },
  }),
  multiValueLabel: (provided: {}) => ({
    ...provided,
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    color: "#181818",
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "#f2f2f2",
    height: "35px",
    "&:hover": { backgroundColor: "#f2f2f2", color: "#272a2b" },
  }),

  input: (provided: {}) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    height: "25px",
    margin: "5px 0",
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
    height: "35px",
  }),
  placeholder: (provided: {}) => ({
    ...provided,
    color: "#969EA9",
  }),
};

export const customStylesDark = {
  control: (provided: {}) => ({
    ...provided,
    background: "#262626",
    border: "1px solid #1e1e1e !important",
    minHeight: "35px",
    height: "35px",
    boxShadow: "none",
    "&:focus": {
      border: "0 !important",
      outline: "none",
    },
  }),
  option: (provided: {}) => ({
    ...provided,
    minHeight: "35px",
    height: "35px",
    backgroundColor: "#262626",
    "&:hover": {
      backgroundColor: "#1c1b1b",
      cursor: "pointer",
    },
  }),
  menuList: (provided: {}) => ({
    ...provided,
    backgroundColor: "#181818",
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    height: "35px",
    padding: "0 6px",
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  }),
  multiValueLabel: (provided: {}) => ({
    ...provided,
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
    color: "#fff",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "none",
    border: "1px solid #262626",
    margin: "0",
    svg: {
      fill: "#fff",
      backgroundColor: "none",
    },
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "#181818 !important",
    height: "35px",
    "&:hover": { backgroundColor: "#181818" },
  }),
  input: (provided: {}) => ({
    ...provided,
    margin: "0px",
    color: "white",
  }),
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    height: "25px",
    margin: "5px 0",
    backgroundColor: "#969EA9",
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
    height: "35px",
  }),
  placeholder: (provided: {}) => ({
    ...provided,
    color: "#969EA9",
  }),
};
