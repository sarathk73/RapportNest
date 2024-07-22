const { parsePhoneNumberFromString } = require('libphonenumber-js');

const parsePhoneNumbers = (req, res, next) => {
  if (req.body.phoneNumbers) {
    try {
      console.log('Before Parsing:', req.body.phoneNumbers);
      req.body.phoneNumbers = JSON.parse(req.body.phoneNumbers);
      console.log('After Parsing:', req.body.phoneNumbers);

      // Validate and format phone numbers
      req.body.phoneNumbers = req.body.phoneNumbers.map(phoneNumber => {
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'IN'); // Adjust default region if necessary
        if (!phoneNumberObj || !phoneNumberObj.isValid()) {
          throw new Error('Invalid phone number format.');
        }
        return phoneNumberObj.number; // Use normalized number
      });

    } catch (err) {
      return res.status(400).json({ message: 'Invalid phoneNumber format,Check the Digits' });
    }
  }
  next();
};

module.exports = parsePhoneNumbers;
