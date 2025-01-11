import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import sgMail from "@sendgrid/mail";
import { IUserDetails } from "../types/user";

const getUser = async (id: string): Promise<IUserDetails | null> => {
  const user = await User.findById(id);

  return user;
};

const checkUserExists = async (
  email: string,
  username: string
): Promise<boolean> => {
  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  return !!existingUser;
};

const register = async (email: string, username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email,
    username: username,
    password: hashedPassword,
    verified: false,
  });
  await sendVerificationEmail(user.username);
};

const authenticateAndGetUser = async (
  username: string,
  password: string
): Promise<(Express.User & { verified: boolean }) | undefined> => {
  const user = await User.findOne(
    { username: username },
    { _id: true, email: true, username: true, password: true, verified: true }
  );

  if (!user) {
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    };
  }
};

const signToken = async (id: string): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("No JWT secret");
  }

  const token = jwt.sign({ _id: id }, jwtSecret, {
    expiresIn: "1d",
  });

  return token;
};

const verifyEmail = async (token: string) => {
  const mailSecret = process.env.MAIL_SECRET;

  if (!mailSecret) {
    throw new Error("No mail secret");
  }

  const payload = jwt.verify(token, mailSecret) as { _id: string };
  await User.updateOne({ _id: payload._id }, { verified: true });
};

const cancelVerification = async (token: string) => {
  const mailSecret = process.env.MAIL_SECRET;

  if (!mailSecret) {
    throw new Error("No mail secret");
  }

  const payload = jwt.verify(token, mailSecret) as { _id: string };
  const result = await User.deleteOne({ _id: payload._id, verified: false });
  if (result.deletedCount === 0) {
    throw new Error("No user");
  }
};

const sendVerificationEmail = async (username: string) => {
  const user = await User.findOne({ username: username, verified: false });
  if (!user) {
    throw new Error("No user");
  }

  const clientUrl = process.env.CLIENT_URL || "localhost:5173";
  const mailSecret = process.env.MAIL_SECRET;
  const emailAddress = process.env.EMAIL_ADDRESS;

  if (!mailSecret || !emailAddress) {
    throw new Error("No mail secret or email address");
  }

  const mailToken = jwt.sign({ _id: user._id }, mailSecret, {
    expiresIn: "1h",
  });
  const verificationLink = `${clientUrl}/verify?token=${mailToken}`;
  const cancelLink = `${clientUrl}/cancel-verification?token=${mailToken}`;
  const msg = {
    from: emailAddress,
    to: user.email,
    subject: "Verify your email address for Shahoot",
    html: `<h1>Shahoot Email Verification</h1>
    <p>Verify now:</p><a href="${verificationLink}">${verificationLink}</a>
    <p>Not you? Cancel this user here:</p><a href="${cancelLink}">${cancelLink}</a>`,
  };
  await sgMail.send(msg);
};

export default {
  getUser,
  checkUserExists,
  register,
  authenticateAndGetUser,
  signToken,
  verifyEmail,
  cancelVerification,
  sendVerificationEmail,
};
