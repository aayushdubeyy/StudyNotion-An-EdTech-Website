// const mailSender = require("../utils/mailSender");

// exports.contactUs = async (req, res) => {
//   const { firstName, lastName, email, message, phoneNo } = req.body;
//   if (!firstName || !email || !message) {
//     return res.status(403).send({
//       success: false,
//       message: "All Fields are required",
//     });
//   }
//   try {
//     const data = {
//       firstName,
//       lastName: `${lastName ? lastName : "null"}`,
//       email,
//       message,
//       phoneNo: `${phoneNo ? phoneNo : "null"}`,
//     };
//     const info = await mailSender(
//       process.env.CONTACT_MAIL,
//       "Enquery",
//       `<html><body>${Object.keys(data).map((key) => {
//         return `<p>${key} : ${data[key]}</p>`;
//       })}</body></html>`
//     );
//     if (info) {
//       return res.status(200).send({
//         success: true,
//         message: "Your message has been sent successfully",
//       });
//     } else {
//       return res.status(403).send({
//         success: false,
//         message: "Something went wrong",
//       });
//     }
//   } catch (error) {
//     return res.status(403).send({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };
const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const {ownerMailSender} = require("../mail/templates/ownerQueryTemplate");
exports.contactUs = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  // console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    const sendToOwner = await mailSender(
      process.env.MAIL_USER,
      "A new User sent you a message : From STUDY NOTION",
      ownerMailSender(email, firstname, lastname, message, phoneNo, countrycode)

    )
    // console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}