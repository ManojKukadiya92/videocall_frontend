import React, { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

//action
import { getSetting } from "../store/setting/action";
import { getLanguage } from "../store/language/action";

//components
import Profile from "./profile";
import Setting from "./Setting";
import PlanTable from "../components/Tables/PlanTable";
import UserTable from "../components/Tables/UserTable";
import ComplainTable from "../components/Tables/ComplainTable";
import LanguageTable from "../components/Tables/LanguageTable";
import RedeemTable from "../components/Tables/RedeemTable";
import HostTable from "../components/Tables/HostTable";
import HostDialog from "../components/Dialog/HostDialog";
import HostAnalytic from "../components/Dialog/HostAnalytic";
import Navbar from "../components/Navbar/Navbar";
import TopHostTable from "../components/Tables/TopHostTable";
import Dashboard from "../components/Tables/Dashboard";
import AcceptedRedeemTable from "../components/Tables/AcceptedRedeemTable";
import SolvedComplainTable from "../components/Tables/SolvedComplainTable";
import UserProfile from "../components/Dialog/UserProfile";
import HostHistory from "../components/Dialog/HostHistory";
import GoogleFbTable from "../components/Tables/GoogleFbTable";
import BannerTable from "../components/Tables/BannerTable";

import Spinner from "../components/Spinner";
import GameTable from "../components/Tables/GameTable";
import CategoryTable from "../components/Tables/CategoryTable";

const Admin = (props) => {
  const location = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push("/admin/dashboard");
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.getSetting();
    props.getLanguage(); // eslint-disable-next-line
  }, []);

  return (
    <div class="wrapper">
      <Navbar />
      {/* </div> */}
      <div class="main-panel">
        <Switch>
          <Route path={`${location.path}/profile`} exact component={Profile} />
          <Route path={`${location.path}/user`} exact component={UserTable} />
          <Route
            path={`${location.path}/user/profile/:id`}
            exact
            component={UserProfile}
          />
          <Route path={`${location.path}/setting`} exact component={Setting} />
          <Route path={`${location.path}/plan`} exact component={PlanTable} />
          <Route path={`${location.path}/host`} exact component={HostTable} />
          <Route
            path={`${location.path}/dashboard`}
            exact
            component={Dashboard}
          />
          <Route
            path={`${location.path}/host/add`}
            exact
            component={HostDialog}
          />
          <Route
            path={`${location.path}/host/analytic/:id`}
            exact
            component={HostAnalytic}
          />
          <Route
            path={`${location.path}/host/history/:id`}
            exact
            component={HostHistory}
          />
          <Route
            path={`${location.path}/complain`}
            exact
            component={ComplainTable}
          />
          <Route
            path={`${location.path}/complain/solved`}
            exact
            component={SolvedComplainTable}
          />
          <Route
            path={`${location.path}/language`}
            exact
            component={LanguageTable}
          />
          <Route path={`${location.path}/game`} exact component={GameTable} />
          <Route
            path={`${location.path}/category`}
            exact
            component={CategoryTable}
          />
          <Route
            path={`${location.path}/redeem`}
            exact
            component={RedeemTable}
          />
          <Route
            path={`${location.path}/redeem/accepted`}
            exact
            component={AcceptedRedeemTable}
          />
          <Route
            path={`${location.path}/topHost`}
            exact
            component={TopHostTable}
          />
          <Route
            path={`${location.path}/banner`}
            exact
            component={BannerTable}
          />
          <Route path={`${location.path}/ad`} exact component={GoogleFbTable} />
        </Switch>
        <Spinner />
      </div>
    </div>
  );
};

export default connect(null, { getSetting, getLanguage })(Admin);
