const nodemailer = require('nodemailer');

const sendNotification = async (notificationSettings, flight) => {
  if (notificationSettings.emailNotifications && notificationSettings.email) {

    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: notificationSettings.email,
      subject: `Flight ${flight.flight_id} Status Update`,
      text: `
        Flight ID: ${flight.flight_id}
        Airline: ${flight.airline}
        Status: ${flight.status}
        Departure Gate: ${flight.departure_gate}
        Arrival Gate: ${flight.arrival_gate}
        Scheduled Departure: ${new Date(flight.scheduled_departure).toLocaleString()}
        Scheduled Arrival: ${new Date(flight.scheduled_arrival).toLocaleString()}
        Actual Departure: ${flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}
        Actual Arrival: ${flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}
      `,
    };

    try {
      const mail = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${notificationSettings.email}`, mail);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
};

module.exports = { sendNotification };
