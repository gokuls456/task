import React, { useEffect, useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../api";
function TableView() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const tableData = useSelector(
    state => state.ApiReducer.apiData && state.ApiReducer.apiData.data
  );
  const loading = useSelector(state => state.ApiReducer.loading);
  const metadata = useSelector(
    state => state.ApiReducer.apiData && state.ApiReducer.apiData.metadata
  );
  const columns = metadata && metadata.columns;
  useEffect(() => {
    dispatch(apiCall());
  }, []);
  const handleSelect = e => {
    setValue(e);
  };
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const filterOptions = tableData && tableData.map(data => data.status);
  const filteredOptions = filterOptions && filterOptions.filter(onlyUnique);

  const afterFilter =
    tableData &&
    tableData.filter(item => item.status === value).map(data => data);

  return (
    <div>
      {!loading && (
        <DropdownButton
          id="dropdown-basic-button"
          className="filter-dropdown"
          title={value ? value : "Filter Status"}
          onSelect={handleSelect}
        >
          <Dropdown.Item onClick={() => setValue("")}>All</Dropdown.Item>
          {filteredOptions.map((data, i) => (
            <Dropdown.Item eventKey={data} key={i}>
              {data}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
      {loading ? (
        <img
          src="https://i.pinimg.com/originals/be/ce/0c/bece0c797cb134aefb2cb836578c9249.gif"
          alt="loading"
        ></img>
      ) : (
        <Table striped bordered hover className="table-view" variant="dark">
          <thead>
            <tr>
              {columns.map((data, i) => (
                <th key={i}>{data.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(value
              ? tableData.filter(item => item.status === value)
              : tableData
            ).map((data, i) => (
              <tr key={i}>
                <td>{data.project_code}</td>
                <td>{data.description}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
                <td>{data.company_name}</td>
                <td>{data.status}</td>
                <td>#</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default TableView;
