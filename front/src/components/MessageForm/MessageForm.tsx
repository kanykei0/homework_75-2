import axiosApi from "@/axiosApi";
import { MessageData, MessageMutation } from "@/types";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const MessageForm = () => {
  const [state, setState] = useState<MessageMutation>({
    password: "",
    encoded: "",
    decoded: "",
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const messageEncodeMutation = useMutation({
    mutationFn: async (message: MessageData) => {
      const response = await axiosApi.post("/messages/encode", message);
      return response.data;
    },
  });

  const messageDecodeMutation = useMutation({
    mutationFn: async (message: MessageData) => {
      const response = await axiosApi.post("/messages/decode", message);
      return response.data;
    },
  });

  const encodeClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await messageEncodeMutation.mutateAsync({
      password: state.password,
      message: state.encoded,
    });

    setState((prevState) => ({
      ...prevState,
      decoded: data.encoded,
    }));
  };

  const decodeClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await messageDecodeMutation.mutateAsync({
      password: state.password,
      message: state.decoded,
    });

    setState((prevState) => ({
      ...prevState,
      encoded: data.decoded,
    }));
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            multiline
            rows={4}
            id="encoded"
            label="Encoded"
            name="encoded"
            value={state.encoded}
            onChange={inputChange}
            required
          />
        </Grid>
        <Grid item xs sx={{ display: "flex" }}>
          <TextField
            type="password"
            id="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChange}
            required
          />
          <Button
            type="submit"
            onClick={encodeClick}
            variant="outlined"
            color="primary"
            sx={{ mx: 2 }}
          >
            Encode
          </Button>
          <Button onClick={decodeClick} variant="outlined" color="primary">
            Decode
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={4}
            id="decoded"
            label="Decoded"
            name="decoded"
            value={state.decoded}
            onChange={inputChange}
            required
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;
