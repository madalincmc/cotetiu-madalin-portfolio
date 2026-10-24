import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";

export interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactNotificationEmail({ name, email, message }: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "8px",
            maxWidth: "560px",
          }}
        >
          <Heading style={{ fontSize: "20px" }}>New contact form submission</Heading>
          <Text style={{ fontSize: "14px", color: "#52525b" }}>
            <strong>From:</strong> {name} ({email})
          </Text>
          <Hr />
          <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
