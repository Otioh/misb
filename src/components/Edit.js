import React, { useState, useEffect } from "react";
import axios from "axios";
import Editpost from "./Editpost";

const Edit = ({ ids }) => {
  useEffect(() => {
    viewPostId(ids);
  }, [ids]);

  const [ispostId, setpostId] = useState([]);
  const viewPostId = async (ids) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND}getPostId`,
          {
            ids,
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            setpostId(res.data.data);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {ispostId.length > 0 ? (
        <>
          <Editpost postList={ispostId} editPostID={ids} />
        </>
      ) : null}
    </>
  );
};
export default Edit;
