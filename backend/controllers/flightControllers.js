const Flight = require('../models/flight');
const notificationService = require('../utils/notificationService');
const {sendNotification} = require("../utils/notificationService");
const {sendSMS} = require("../utils/smsService")

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotifications  = async (req, res) => {
    const { email, phoneNumber, flight_id, emailNotifications, smsNotifications } = req.body;

    try {
      const flight = await Flight.findOne({ flight_id: flight_id });
  
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
  
      const notificationSettings = {
        email,
        phoneNumber,
        emailNotifications,
        smsNotifications,
      };
  
      if (emailNotifications) {
        await sendNotification(notificationSettings, flight);
      }
  
      if (smsNotifications) {
        await sendSMS(phoneNumber, flight);
      }
  
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send notification' });
    }
  };


module.exports = { getFlights, getNotifications};
