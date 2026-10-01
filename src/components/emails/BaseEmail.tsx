import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components'
import * as React from 'react'

interface BaseEmailProps {
  previewText: string
  title: string
  greeting: string
  children: React.ReactNode
  buttonText?: string
  buttonHref?: string
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0B6E3F',
  margin: '30px 0',
  textAlign: 'center' as const,
}

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const button = {
  backgroundColor: '#0B6E3F',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  marginTop: '20px',
}

export const BaseEmail = ({
  previewText,
  title,
  greeting,
  children,
  buttonText,
  buttonHref,
}: BaseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>{title}</Heading>
            <Hr style={hr} />
            <Text style={paragraph}>{greeting}</Text>
            
            {children}

            {buttonText && buttonHref && (
              <Section style={{ marginTop: '32px', marginBottom: '32px' }}>
                <Button style={button} href={buttonHref}>
                  {buttonText}
                </Button>
              </Section>
            )}
            
            <Hr style={hr} />
            <Text style={footer}>
              อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติจากระบบ Football Store<br />
              กรุณาอย่าตอบกลับอีเมลนี้
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
