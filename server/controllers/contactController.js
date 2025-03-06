const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Set up the transporter (Replace with your SMTP details)
    let transporter = nodemailer.createTransport({
      service: "gmail", // Use "gmail", "outlook", etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Your email (receiver)
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
};
