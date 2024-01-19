"use client";
import MessageForm from "@/components/MessageForm/MessageForm";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <MessageForm />
    </Container>
  );
}
