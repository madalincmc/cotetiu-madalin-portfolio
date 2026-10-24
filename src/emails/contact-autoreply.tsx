import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import { siteConfig } from "@/lib/site-config";

export interface ContactAutoReplyEmailProps {
  name: string;
}

export function ContactAutoReplyEmail({ name }: ContactAutoReplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out — I&apos;ll get back to you soon</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "8px",
            maxWidth: "560px",
          }}
        >
          <Heading style={{ fontSize: "20px" }}>Thanks for reaching out, {name}.</Heading>
          <Text style={{ fontSize: "14px", color: "#3f3f46" }}>
            I&apos;ve received your message and will get back to you as soon as I can — usually
            within a couple of days.
          </Text>
          <Text style={{ fontSize: "14px", color: "#71717a" }}>— {siteConfig.name}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactAutoReplyEmail;
