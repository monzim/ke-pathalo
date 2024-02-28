import axios from "axios";

export enum SendEmailErrorType {
  NoConnection = "No connection string",
  SendingError = "Error sending email",
}

interface IncomingRequest {
  subject: string;
  plainText: string;
  html?: string;
  to: string[];
  sender?: string;
}

class SendEmailError extends Error {
  constructor(message: string, public errorType: SendEmailErrorType) {
    super(message);
    Object.setPrototypeOf(this, SendEmailError.prototype);
  }
}

export async function sendEmail(payload: IncomingRequest) {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    console.log({ payload });
    console.log("Email sent in development mode.");
    return;
  }

  const connection = process.env.MAIL_DISPATCHER_URL as string;

  if (!connection) {
    throw new SendEmailError(
      SendEmailErrorType.NoConnection,
      SendEmailErrorType.NoConnection
    );
  }

  try {
    const incomingRequest: IncomingRequest = {
      subject: payload.subject,
      plainText: payload.plainText || "",
      html: payload.html || "",
      to: payload.to,
      sender: process.env.EMAIL_SENDER as string,
    };

    const { status, data } = await axios.post(connection, incomingRequest);
    if (status !== 200) {
      throw new SendEmailError(
        SendEmailErrorType.SendingError,
        SendEmailErrorType.SendingError
      );
    }

    return data;
  } catch (error) {
    throw new SendEmailError(
      SendEmailErrorType.SendingError,
      SendEmailErrorType.SendingError
    );
  }
}
