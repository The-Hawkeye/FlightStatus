const twilio = require('twilio');
require('dotenv').config();

const sendSMS = async (to, flight) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const message = `
    Flight ID: ${flight.flight_id}
    Airline: ${flight.airline}
    Status: ${flight.status}
    Departure Gate: ${flight.departure_gate}
    Arrival Gate: ${flight.arrival_gate}
    Scheduled Departure: ${new Date(flight.scheduled_departure).toLocaleString()}
    Scheduled Arrival: ${new Date(flight.scheduled_arrival).toLocaleString()}
    Actual Departure: ${flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}
    Actual Arrival: ${flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}
  `;

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error(`Error sending SMS: ${error}`);
  }
};

module.exports = { sendSMS };
