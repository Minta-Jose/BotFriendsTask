import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";

import axios from "axios";

const Config = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      url: "",
      secret: "",
    },
  });
  const onSubmit = (data) => {
    reset();
    axios //read entered url & secret and post to db
      .post("http://localhost:3031/posts", {
        webhookUrl: data.url,
        apiSecret: data.secret,
      })
      .then((res) => {
        console.log(res.data.data["_id"]); 
        sessionStorage.setItem("postKey", res.data.data["_id"]); //store unique id of the post in session to read later in chat window
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} > 
      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <TextField
            style={{ margin: "0.5em 0" }}
            fullWidth
            label="Url"
            variant="outlined"
            size="small"
            {...field}
          />
        )}
      />
      <Controller
        name="secret"
        control={control}
        render={({ field }) => (
          <TextField
            style={{ margin: "0.5em 0" }}
            fullWidth
            label="Secret"
            variant="outlined"
            size="small"
            {...field}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Config;
