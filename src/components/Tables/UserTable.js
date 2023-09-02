import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//action
import {
  getUser,
  blockUnblockUser,
  editCoin,
  createUserHistory,
} from "../../store/user/action";

//dayjs
import dayjs from "dayjs";

import { Snackbar, Button } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//topNav
import TopNav from "../Navbar/Topnav";

//no image photo
import Images from "../../images/images.webp";

//inline edit
import EdiText from "react-editext";
import { OPEN_USER_DIALOG } from "../../store/user/types";
import { Alert } from "@material-ui/lab";

import { baseURL, key } from "../../util/ServerPath";

//Date Range Picker
import { DateRangePicker } from "react-date-range";
//Calendar Css
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import $ from "jquery";

const UserTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(25);

  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [search, setSearch] = useState("");

  const [coin, setCoin] = useState();
  const [isCoin, setIsCoin] = useState(false);

  const [coinError, setCoinError] = useState(null);
  const [openCoinError, setOpenCoinError] = useState(false);

  const { user, total } = useSelector((state) => state.user);

  useEffect(() => {
    setIsCoin(false);
    setData(user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("value", "all");
    props.getUser(activePage, rowsPerPage, "ALL"); //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const value = localStorage.getItem("value");
    const sDate = localStorage.getItem("sDate");
    const eDate = localStorage.getItem("eDate");

    props.getUser(
      activePage,
      parseInt(rowsPerPage),
      value === "all" ? "ALL" : sDate,
      eDate
    ); //eslint-disable-next-line
  }, [activePage, rowsPerPage]);

  //get all user
  const getAllUser = () => {
    localStorage.setItem("value", "all");
    props.getUser(activePage, rowsPerPage, "ALL");
    $("#submenu5").removeClass("show");
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (search != "") {
      fetch(
        `${baseURL}/user/search?value=${search}&key=${key}&start=${activePage}&limit=${rowsPerPage}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setData(user);
    } // eslint-disable-next-line
  }, [search]);

  // const handleSearch = (e) => {
  //   const value = e.target.value.toUpperCase();
  //   if (value) {
  //     const data = user.filter((data) => {
  //       return data?.name?.toUpperCase()?.indexOf(value) > -1;
  //     });
  //     setData(data);
  //   } else {
  //     return setData(user);
  //   }
  // };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const value = localStorage.getItem("value");
  const sDate = localStorage.getItem("sDate");
  const eDate = localStorage.getItem("eDate");
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    props.getUser(
      pageNumber,
      rowsPerPage,
      value === "all" ? "ALL" : sDate,
      eDate
    );
  };

  // const handleBlockUnblock = (id) => {
  //   props.blockUnblockUser(id);
  // };

  const handleSave = (coin, id, oldCoin) => {
    let newCoin = 0;
    setIsCoin(true);

    if (oldCoin < coin) {
      newCoin = coin - oldCoin;
    } else {
      setOpenCoinError(true);
      setCoinError("You Can't less User Coin");
      props.getUser(
        activePage,
        rowsPerPage,
        value === "all" ? "ALL" : sDate,
        eDate
      );
      return true;
    }
    props.editCoin({ coin }, id);
    const data = {
      coin: newCoin,
      plan_id: "111111111111111111111111",
      user_id: id,
    };
    props.createUserHistory(data);
    setCoin(coin);
  };

  const handleUserProfile = (data) => {
    dispatch({ type: OPEN_USER_DIALOG, payload: data });
  };

  const handleCloseError = () => {
    setOpenCoinError(false);
    setCoin(null);
  };

  useEffect(() => {
    if (state.length === 0) {
      setState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    }
    setData(user);
    $("#submenu5").removeClass("show");
  }, [state, user]);

  //Toggle Jquery
  const collapsed5 = () => {
    $("#submenu5").toggleClass("collapse");
  };

  return (
    <>
      <TopNav />
      <Snackbar
        open={openCoinError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {coinError}
        </Alert>
      </Snackbar>
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header pt-4 pl-5 ml-2">
              {/* <h4 class="title text-center">Country Table</h4> */}
            </div>
            <div>
              <div class="col-xs-12 col-sm-12  col-lg-4 mt-3 float-right">
                <form action="">
                  <div class="input-group mb-4 border rounded-pill ">
                    <div class="input-group-prepend border-0">
                      <div id="button-addon4" class="btn btn-link text-primary">
                        <i class="fa fa-search"></i>
                      </div>
                    </div>
                    <input
                      type="search"
                      placeholder="What're you searching for?"
                      aria-describedby="button-addon4"
                      class="form-control bg-none border-0 rounded-pill text-white"
                      onChange={(e) => setSearch(e.target.value)}
                      // onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
              <div class="mt-4 float-left mx-4 ">
                <h4 class="text-primary">User Table</h4>
              </div>
              <div class="col-md-8 col-12 align-self-center mt-3">
                <div className="text-end px-md-5 ">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    value="check"
                    className="mr-2"
                    onClick={getAllUser}
                  >
                    all
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    className="collapsed"
                    value="check"
                    data-toggle="collapse"
                    data-target="#submenu5"
                    onClick={collapsed5}
                  >
                    Analytics
                    <ExpandMoreIcon />
                  </Button>
                </div>
                <div className="text-end px-md-4 ">
                  <div
                    id="submenu5"
                    className="collapse "
                    aria-expanded="false"
                  >
                    <div className="container  mt-3">
                      <div key={JSON.stringify(state)}>
                        <DateRangePicker
                          onChange={(item) => {
                            setState([item.selection]);
                            const dayStart = dayjs(
                              item.selection.startDate
                            ).format("M/D/YYYY");
                            const dayEnd = dayjs(item.selection.endDate).format(
                              "M/D/YYYY"
                            );
                            localStorage.setItem("value", "analytic");
                            localStorage.setItem("sDate", dayStart);
                            localStorage.setItem("eDate", dayEnd);

                            props.getUser(
                              activePage,
                              rowsPerPage,
                              dayStart,
                              dayEnd
                            );
                          }}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                          direction="horizontal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 float-left mx-4 ">
              <h4 class="text-primary">Total User : {total}</h4>
              <span class="text-primary">
                Date :&nbsp;
                {value === "all" ? "All" : `${sDate} - ${eDate} `}
              </span>
            </div>
            <div class="card-body" style={{ overflowX: "auto" }}>
              <table
                id="example"
                class="table display"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Coin</th>
                    <th>Created At</th>
                    {/* <th>Created At</th>
                    <th>Updated At</th> */}
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={
                                  data.image === "null" ? Images : data.image
                                }
                                width="70px"
                                height="70px"
                                alt="img"
                                style={{
                                  objectFit: "contain",
                                  borderRadius: "50%",
                                }}
                              ></img>
                            </td>
                            <td>{data.guest}</td>
                            <td align="left">
                              <EdiText
                                type="text"
                                value={isCoin ? coin : data.coin}
                                onSave={(val) =>
                                  handleSave(val, data._id, data.coin)
                                }
                                // editButtonClassName="editClass"
                                className="editClass"
                              />
                            </td>

                            {/* <td>
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  checked={data.isBlock}
                                  onChange={() => handleBlockUnblock(data._id)}
                                />
                                <span class="slider block">
                                  <p
                                    style={{
                                      fontSize: 10,
                                      marginLeft: `${
                                        data.isBlock ? "2px" : "32px"
                                      }`,
                                      color: "white",
                                      marginTop: "5px",
                                    }}
                                  >
                                    {data.isBlock ? "Block" : "No"}
                                  </p>
                                </span>
                              </label>
                            </td> */}
                            <td style={{ verticalAlign: "middle" }}>
                              {data.analyticDate ? data.analyticDate : "-"}
                            </td>

                            {/* <td>
                              {dayjs(data.createdAt.slice(0, 10)).format(
                                "DD MMM, YYYY"
                              )}
                            </td>
                            <td>
                              {dayjs(data.updatedAt.slice(0, 10)).format(
                                "DD MMM, YYYY"
                              )}
                            </td> */}
                            <td>
                              <Link to={"/admin/user/profile/" + data._id}>
                                <button
                                  type="button"
                                  class="btn btn-fill btn-primary btn-sm"
                                  style={{ borderRadius: 5 }}
                                  onClick={() => handleUserProfile(data)}
                                >
                                  <i class="fas fa-eye text-white pr-2"></i>View
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="9" align="center">
                        Nothing to show!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div class="py-2">
                {/* <TablePagination
                  id="pagination"
                  component="div"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                    100,
                    200,
                    500,
                    { label: "All", value: -1 },
                  ]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                /> */}
                <div className="row">
                  <div className="col-md-2 d-flex float-left">
                    <span className="m-auto">Select</span>
                    <select
                      class="form-select form-control mr-3 ml-2 mb-2 mb-md-0 mb-lg-0"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setRowsPerPage(e.target.value);
                      }}
                      style={{ borderColor: "#e14eca" }}
                    >
                      <option class="text-dark" value={5}>
                        5
                      </option>
                      <option class="text-dark" value={10} selected>
                        10
                      </option>
                      <option class="text-dark" value={25}>
                        25
                      </option>
                      <option class="text-dark" value={50}>
                        50
                      </option>
                      <option class="text-dark" value={100}>
                        100
                      </option>
                      <option class="text-dark" value={200}>
                        200
                      </option>
                      <option class="text-dark" value={500}>
                        500
                      </option>
                      <option class="text-dark" value={1000}>
                        1000
                      </option>
                      <option class="text-dark" value={5000}>
                        5000
                      </option>
                      {/* <option class="text-dark" value="10000">
                        10000
                      </option> */}
                      {/* <option class="text-dark" value="20000">
                        20000
                      </option> */}
                    </select>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-4 float-right">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={rowsPerPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={3}
                      onChange={(page) => handlePageChange(page)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
                {/* <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      50,
                      100,
                      200,
                      500,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getUser,
  blockUnblockUser,
  editCoin,
  createUserHistory,
})(UserTable);
