const nodemailer = require("nodemailer");

const template = require("../config/template");
const keys = require("../config/keys");

const { user, pass } = keys.gmail;

class GmailService {
  init() {
    try {
      return nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secureConnection: false,
        auth: {
          user: user,
          pass: pass,
        },
      });
    } catch (error) {
      console.error(error);
      console.warn("Missing gmail keys");
    }
  }
}

const gmail = new GmailService().init();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const config = {
      from: `MERN Store! <${user}>`,
      to: email,
      subject: message.subject,
      html: message.html,
    };

    return await gmail.sendMail(config);
  } catch (error) {
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case "reset":
      message = template.resetEmail(host, data);
      break;

    case "reset-confirmation":
      message = template.confirmResetPasswordEmail();
      break;

    case "signup":
      message = template.signupEmail(data);
      break;

    case "merchant-signup":
      message = template.merchantSignup(host, data);
      break;

    case "merchant-welcome":
      message = template.merchantWelcome(data);
      break;

    case "newsletter-subscription":
      message = template.newsletterSubscriptionEmail();
      break;

    case "contact":
      message = template.contactEmail();
      break;

    case "merchant-application":
      message = template.merchantApplicationEmail();
      break;

    case "merchant-deactivate-account":
      message = template.merchantDeactivateAccount();
      break;

    case "order-confirmation":
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = "";
  }

  return message;
};
