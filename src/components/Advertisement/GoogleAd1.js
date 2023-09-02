import React, { useState, useEffect, Fragment } from "react";

// Redux
import { useSelector, connect } from "react-redux";

import { getGoogleFbAd, showToggle } from "../../store/googleFbAd/action";

// MUI
import { Grid, Typography } from "@material-ui/core";

// Components
import AddField from "./AddField";
import IOSSwitch from "@material-ui/core/Switch";
import { permissionError } from "../../util/alert";

const GoogleAd = (props) => {
  const ad = useSelector((state) => state.googleFbAd.googleFb.google1);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [mongoID, setMongoID] = useState("");
  const [bannerId, setBannerId] = useState(" ");
  const [nativeId, setNativeId] = useState(" ");
  const [appOpenAd, setAppOpenAd] = useState(" ");
  const [interstitial, setInterstitialId] = useState(" ");
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.getGoogleFbAd(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setBannerId(ad?.banner);
    setNativeId(ad?.native);
    setInterstitialId(ad?.interstitial);
    setMongoID(ad?._id);
    setShow(ad?.show);
    setAppOpenAd(ad?.appOpenAd);
  }, [ad]);

  const handleShowChange = () => {
    if (!hasPermission) return permissionError();
    props.showToggle(mongoID);
    setShow(!show);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography
          variant="h6"
          style={{ marginBottom: 20, fontSize: 16 }}
          class="text-primary"
        >
          Google Ad 1 Revenue
          <IOSSwitch
            onChange={handleShowChange}
            checked={show}
            color="secondary"
          />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddField
          title="Interstitial ID"
          name="interstitial"
          mongoID={mongoID}
          value={interstitial}
          onChange={setInterstitialId}
        />
        <AddField
          title="Banner ID"
          name="banner"
          mongoID={mongoID}
          value={bannerId}
          onChange={setBannerId}
        />

        <AddField
          title="Native Id"
          name="native"
          mongoID={mongoID}
          value={nativeId}
          onChange={setNativeId}
        />
        <AddField
          title="App Open Id"
          name="appOpenAd"
          mongoID={mongoID}
          value={appOpenAd}
          onChange={setAppOpenAd}
        />
      </Grid>
    </Fragment>
  );
};

export default connect(null, {
  getGoogleFbAd,
  showToggle,
})(GoogleAd);
