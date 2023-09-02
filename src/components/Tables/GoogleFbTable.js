import React from "react";

import GoogleAd from "../Advertisement/GoogleAd";

import GoogleAd1 from "../Advertisement/GoogleAd1";

//topNav
import TopNav from "../Navbar/Topnav";

const GoogleFbAd = () => {
  return (
    <>
      <TopNav />
      <div class="content">
        <div class="card py-0 px-0 py-xl-1 px-xl-4">
          <div class="row">
            <div class="col-12">
              <div class="card py-0 px-0 py-xl-1 px-xl-4 ">
                <div class="card-body" style={{ overflow: "auto" }}>
                  <div>
                    <GoogleAd />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card py-0 px-0 py-xl-1 px-xl-4 ">
                <div class="card-body" style={{ overflow: "auto" }}>
                  <div>
                    <GoogleAd1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleFbAd;
