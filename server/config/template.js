const fs = require("fs");
const path = require("path");

exports.resetEmail = (host, resetToken) => {
  const filePath = path.join(__dirname, '"./resetpass/index.html"');
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const message = {
    subject: "Reset Password",
    html: htmlContent,
  };

  return message;
};

exports.confirmResetPasswordEmail = () => {
  const message = {
    subject: "Password Changed",
    html: `
      <div>
        <p>You are receiving this email because you changed your password.</p>
        <p>If you did not request this change, please contact us immediately.</p>
      </div>
    `,
  };

  return message;
};

exports.merchantSignup = (host, { resetToken, email }) => {
  const message = {
    subject: "Merchant Registration",
    html: `
      <div>
        <p>Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below.</p>
        <p><a href="http://${host}/merchant-signup/${resetToken}?email=${email}">Merchant Account Signup</a></p>
      </div>
    `,
  };

  return message;
};

exports.merchantWelcome = (name) => {
  const message = {
    subject: "Merchant Registration",
    html: `
      <div>
        <p>Hi ${name}! Congratulations! Your application for a merchant account has been accepted.</p>
        <p>It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.</p>
      </div>
    `,
  };

  return message;
};

exports.signupEmail = (name) => {
  const message = {
    subject: "Account Registration",
    html: `
      <div>
        <p>Hi ${name.firstName} ${name.lastName}! Thank you for creating an account with us!</p>
      </div>
    `,
  };

  return message;
};

exports.newsletterSubscriptionEmail = () => {
  const message = {
    subject: "Newsletter Subscription",
    html: `
      <div>
        <p>You are receiving this email because you subscribed to our newsletter.</p>
        <p>If you did not request this change, please contact us immediately.</p>
      </div>
    `,
  };

  return message;
};

exports.contactEmail = () => {
  const message = {
    subject: "Contact Us",
    html: `
      <div>
        <p>We received your message! Our team will contact you soon.</p>
      </div>
    `,
  };

  return message;
};

exports.merchantApplicationEmail = () => {
  const message = {
    subject: "Sell on MERN Store",
    html: `
      <div>
        <p>We received your request! Our team will contact you soon.</p>
      </div>
    `,
  };

  return message;
};

exports.merchantDeactivateAccount = () => {
  const message = {
    subject: "Merchant account on MERN Store",
    html: `
      <div>
        <p>Your merchant account has been disabled.</p>
        <p>Please contact admin to request access again.</p>
      </div>
    `,
  };

  return message;
};

exports.orderConfirmationEmail = (order) => {
  const message = {
    subject: `Order Confirmation ${order._id}`,
    html: `
      <div>
        <p>Hi ${order.user.profile.firstName}! Thank you for your order!</p>
        <p>We've received your order and will contact you as soon as your package is shipped.</p>
      </div>
    `,
  };

  return message;
};
