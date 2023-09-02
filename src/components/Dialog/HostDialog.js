import React, { useState, useEffect } from "react";

//react-router-dom
import { useHistory } from "react-router-dom";

//react-redux
import { useSelector, connect } from "react-redux";
import { createNewHost, editHost } from "../../store/host/action";

import { Typography } from "@material-ui/core";

//alert
import { alert, permissionError } from "../../util/alert";

//topNav
import TopNav from "../Navbar/Topnav";

//jquery
import $ from "jquery";

const HostDialog = (props) => {
  const LanguageList = useSelector((state) => state.language.language);

  const [mongoId, setMongoId] = useState("");

  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");

  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [imageData1, setImageData1] = useState(null);
  const [imagePath1, setImagePath1] = useState(null);
  const [imageData2, setImageData2] = useState(null);
  const [imagePath2, setImagePath2] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [type, setType] = useState("link");
  const [link, setLink] = useState("");

  const [errors, setError] = useState({
    language: "",
    name: "",
    bio: "",
    age: "",
    video: "",
    image: "",
    image1: "",
    image2: "",
  });

  const { dialog: open, dialogData } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  useEffect(() => {
    setError({
      language: "",
      name: "",

      bio: "",
      age: "",
      video: "",
      image: "",
      image1: "",
      image2: "",
    });
    setMongoId("");
    setName("");

    setAge("");
    setBio("");

    setLanguage("");
    setImagePath("");

    setImageCount1(0);
    setImagePath1("");
    setImageCount2(0);
    setImagePath2("");
    setLink("");
  }, [open]);
  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);

      setAge(dialogData.age);
      setBio(dialogData.bio);
      setVideoPath(dialogData.video);
      setLanguage(dialogData.language ? dialogData.language._id : "Deleted");
      setImagePath(dialogData.image);
      if (dialogData.image1 !== "null") {
        setImageCount1(1);
        setImagePath1(dialogData.image1);
      }
      if (dialogData.image2 !== "null") {
        setImageCount2(1);
        setImagePath2(dialogData.image2);
      }
      setType(dialogData.videoType);
      setLink(dialogData.video);
    }
  }, [dialogData]);

  let history = useHistory();

  const removeImage = () => {
    $("#image").val("");
    setImageData(null);
    setImagePath(null);
  };
  const removeImage1 = () => {
    $("#image1").val("");
    setImageData1(null);
    setImagePath1(null);
  };
  const removeImage2 = () => {
    $("#image2").val("");
    setImageData2(null);
    setImagePath2(null);
  };
  const removeVideo = () => {
    $("#video").val("");
    setVideoData(null);
    setVideoPath(null);
  };

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;
      if (size > 150) {
        return setError({
          ...errors,
          image: "Please Select Image Size less than 150 KB!",
        });
      }
      setError({ ...errors, image: "" });
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleInputImage1 = (e) => {
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;
      if (size > 150) {
        return setError({
          ...errors,
          image1: "Please Select Image Size less than 150 KB!",
        });
      }
      setError({ ...errors, image1: "" });
      setImageData1(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath1(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleInputImage2 = (e) => {
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;
      if (size > 150) {
        return setError({
          ...errors,
          image2: "Please Select Image Size less than 150 KB!",
        });
      }
      setError({ ...errors, image2: "" });

      setImageData2(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath2(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleInputVideo = (e) => {
    if (e.target.files[0]) {
      setVideoData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setVideoPath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  let [imageCount1, setImageCount1] = useState(0);
  let [imageCount2, setImageCount2] = useState(0);

  const addImageField = () => {
    if (!mongoId) {
      if (!imageData || !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    if (mongoId) {
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    if (imageCount1 === 1) {
      if (!mongoId) {
        if (!imageData1 || !imagePath1) {
          return setError({ ...errors, image1: "Please select an Image!" });
        }
      }
      if (mongoId) {
        if (!imageData1 && !imagePath1) {
          return setError({ ...errors, image1: "Please select an Image!" });
        }
      }
      setImageCount2(1);
    }
    setImageCount1(1);

    if (imageCount1 === 1 && imageCount2 === 1) {
      alert("Warning!", `You Can Select Only 3 Image`, "warning");
    }
  };
  const removeImageField = () => {
    if (imageCount2 === 1) {
      setImageCount2(0);
      setImageData2(null);
      setImagePath2(null);
    } else {
      setImageCount1(0);
      setImageData1(null);
      setImagePath1(null);
      setError({ ...errors, image1: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type);

    if (!name || !bio || !age || !language || !imagePath) {
      const errors = {};

      if (!name) {
        errors.name = "Name can't be a Blank!";
      }

      if (!bio) {
        errors.bio = "Bio can't be a Blank!";
      }
      if (!age) {
        errors.age = "Age can't be a Blank!";
      }

      if (!language) {
        errors.language = "Please Select a Language!";
      }
      if (!mongoId) {
        if (!imageData || !imagePath) {
          errors.image = "Please select an Image!";
        }
      }
      if (mongoId) {
        if (!imageData && !imagePath) {
          errors.image = "Please select an Image!";
        }
      }

      return setError({ ...errors });
    }
    if (!mongoId) {
      if (type === "video") {
        if (!videoData || !videoPath) {
          return setError({ ...errors, video: "Please select a Video!" });
        }
      } else {
        if (!link) {
          return setError({ ...errors, video: "Video Link is Required!" });
        }
      }
    } else {
      if (type === "video") {
        if (!videoData && !videoPath) {
          return setError({ ...errors, video: "Please select a Video!" });
        }
      } else {
        if (!link) {
          return setError({ ...errors, video: "Video Link is Required!" });
        }
      }
    }

    if (bio.length >= 500) {
      return setError({
        ...errors,
        bio: "Maximum 500 Characters are Allowed!",
      });
    }

    if (age.toString().length >= 3) {
      return setError({
        ...errors,
        age: "Please Enter Age between 10 to 100!",
      });
    }

    const validateAge =
      age.toString().includes("-") || age.toString().includes(".");

    if (validateAge) {
      return setError({ ...errors, age: "Invalid Value!" });
    }

    if (language === "Language" || language === "Deleted") {
      return setError({
        ...errors,
        language: "Please Select a Language!",
      });
    }

    setError({ ...errors, hostId: "", password: "" });

    if (!hasPermission) return permissionError();
    const formData = new FormData();
    formData.append("name", name);

    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("language", language);
    formData.append("videoType", type);
    formData.append("video", type === "link" ? link : videoData);
    formData.append("image", imageData);
    formData.append("image1", imageData1);
    formData.append("image2", imageData2);

    if (mongoId) {
      props.editHost(formData, mongoId);
      history.push("/admin/host");
    } else {
      props.createNewHost(formData);
      history.push("/admin/host");
    }
  };

  const handleCancel = () => {
    setError({
      language: "",
      name: "",

      bio: "",
      age: "",
      video: "",
      image: "",
      image1: "",
      image2: "",
    });
    setName("");

    setAge("");
    setBio("");
    setImageCount1(0);
    setImageCount2(0);
    setImageData(null);
    setImageData1(null);
    setImageData2(null);
    setImagePath(null);
    setImagePath1(null);
    setImagePath2(null);
    setLanguage("");
    setVideoData(null);
    setVideoPath(null);
    setLink("");

    history.push("/admin/host");
  };

  return (
    <>
      <TopNav />
      <div class="content">
        <div class="row">
          <div class="card">
            <div class="card-header">
              <h4 class="text-primary">{mongoId ? "Edit Host" : "Add Host"}</h4>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control text-white"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            name: "Name can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            name: "",
                          });
                        }
                      }}
                    />
                    {errors.name && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.name}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Bio</label>
                    <textarea
                      type="text"
                      class="form-control text-white"
                      placeholder="Name"
                      rows="3"
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            bio: "Bio can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            bio: "",
                          });
                        }
                      }}
                    />
                    {errors.bio && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.bio}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      class="form-control text-white"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            age: "Age can't be a Blank!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            age: "",
                          });
                        }
                      }}
                    />
                    {errors.age && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.age}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="float-left">Language</label>

                    <select
                      class="form-select form-control"
                      aria-label="Default select example"
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            language: "Please select a Language!",
                          });
                        } else if (e.target.value === "Language") {
                          return setError({
                            ...errors,
                            language: "Please select a Language!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            language: "",
                          });
                        }
                      }}
                    >
                      <option class="text-dark" selected>
                        Language
                      </option>

                      {LanguageList.map((language) => {
                        return (
                          <option class="text-dark" value={language._id}>
                            {language.language}
                          </option>
                        );
                      })}
                    </select>
                    {errors.language && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.language}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mt-3">
                  <label style={{ verticalAlign: "top" }}>
                    Select Video Type :{" "}
                  </label>
                  <input
                    type="radio"
                    id="video"
                    name="video"
                    value="video"
                    className="ml-2 pt-5"
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label
                    for="video"
                    className="ml-1 mr-3 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Video
                  </label>
                  <input
                    type="radio"
                    id="link"
                    name="video"
                    value="link"
                    checked={type === "link" ? true : false}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label
                    for="link"
                    className="ml-1 mb-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Link
                  </label>
                  {type === "link" && (
                    <input
                      type="text"
                      class="form-control text-white"
                      placeholder="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  )}
                  {type === "video" && (
                    <>
                      <input
                        class="form-control"
                        type="file"
                        id="video"
                        accept="video/*"
                        required=""
                        onChange={handleInputVideo}
                      />
                      {errors.video && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.video}
                          </Typography>
                        </div>
                      )}
                      {videoPath && (
                        <>
                          <video
                            src={videoPath}
                            class="mt-3 rounded float-left mb-2"
                            height="100px"
                            width="100px"
                            controls={true}
                            controlsList="nodownload"
                            alt="video"
                          />
                          <div
                            class="img-container"
                            style={{
                              display: "inline",
                              position: "relative",
                              float: "left",
                              color: "#414755",
                            }}
                          >
                            <i
                              class="fas fa-times-circle material-icons remove_img text-primary"
                              style={{
                                position: "absolute",
                                right: "-6px",
                                top: "10px",
                                cursor: "pointer",
                              }}
                              onClick={removeVideo}
                            ></i>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div class="row mt-3"></div>
              <div class="row mt-3">
                <div class="col-md-11">
                  {/* <div class="form-group"> */}
                  <label>Image</label>
                  <input
                    class="form-control"
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleInputImage}
                  />
                  {errors.image && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                  {imagePath && (
                    <>
                      <img
                        src={imagePath}
                        class="mt-3 rounded float-left mb-2"
                        height="100px"
                        width="100px"
                        alt="img"
                      />
                      <div
                        class="img-container"
                        style={{
                          display: "inline",
                          position: "relative",
                          float: "left",
                        }}
                      >
                        <i
                          class="fas fa-times-circle material-icons remove_img text-primary"
                          style={{
                            position: "absolute",
                            right: "-6px",
                            top: "10px",
                            cursor: "pointer",
                          }}
                          onClick={removeImage}
                        ></i>
                      </div>
                    </>
                  )}
                </div>
                {/* </div> */}
                <div class="col-md-1">
                  <button
                    type="button"
                    class="btn btn-fill btn-warning btn-sm mt-2 mt-lg-4"
                    style={{ borderRadius: 5 }}
                    onClick={addImageField}
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                {imageCount1 === 1 && (
                  <>
                    <div class="col-md-11 mt-3">
                      {/* <div class="form-group"> */}
                      <label>Image</label>
                      <input
                        class="form-control"
                        type="file"
                        id="image1"
                        accept="image/*"
                        onChange={handleInputImage1}
                      />
                      {errors.image1 && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.image1}
                          </Typography>
                        </div>
                      )}
                      {imagePath1 && (
                        <>
                          <img
                            src={imagePath1}
                            class="mt-3 rounded float-left mb-2"
                            height="100px"
                            width="100px"
                            alt="img"
                          />
                          <div
                            class="img-container"
                            style={{
                              display: "inline",
                              position: "relative",
                              float: "left",
                            }}
                          >
                            <i
                              class="fas fa-times-circle material-icons remove_img text-primary"
                              style={{
                                position: "absolute",
                                right: "-6px",
                                top: "10px",
                                cursor: "pointer",
                              }}
                              onClick={removeImage1}
                            ></i>
                          </div>
                        </>
                      )}
                    </div>
                    {/* </div> */}
                    <div class="col-md-1">
                      <button
                        type="button"
                        class="btn btn-fill btn-warning btn-sm mt-2 mt-lg-5"
                        style={{ borderRadius: 5 }}
                        onClick={removeImageField}
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </>
                )}
                {imageCount2 === 1 && (
                  <>
                    <div class="col-md-11 mt-3">
                      {/* <div class="form-group"> */}
                      <label>Image</label>
                      <input
                        class="form-control"
                        type="file"
                        id="image2"
                        accept="image/*"
                        onChange={handleInputImage2}
                      />
                      {errors.image2 && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.image2}
                          </Typography>
                        </div>
                      )}

                      {imagePath2 && (
                        <>
                          <img
                            src={imagePath2}
                            class="mt-3 rounded float-left mb-2"
                            height="100px"
                            width="100px"
                            alt="img"
                          />
                          <div
                            class="img-container"
                            style={{
                              display: "inline",
                              position: "relative",
                              float: "left",
                            }}
                          >
                            <i
                              class="fas fa-times-circle material-icons remove_img text-primary"
                              style={{
                                position: "absolute",
                                right: "-6px",
                                top: "10px",
                                cursor: "pointer",
                              }}
                              onClick={removeImage2}
                            ></i>
                          </div>
                        </>
                      )}
                    </div>
                    {/* </div> */}
                    <div class="col-md-1">
                      <button
                        type="button"
                        class="btn btn-fill btn-warning btn-sm mt-2 mt-lg-5"
                        style={{ borderRadius: 5 }}
                        onClick={removeImageField}
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                class="btn btn-fill btn-default btn-md mt-0 mt-lg-4 float-right ml-3"
                style={{ borderRadius: 5 }}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-fill btn-primary btn-md mt-0 mt-lg-4 float-right"
                style={{ borderRadius: 5 }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { createNewHost, editHost })(HostDialog);
