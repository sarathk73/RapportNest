const { parsePhoneNumberFromString } = require('libphonenumber-js');

const parsePhoneNumbers = (req, res, next) => {
  if (req.body.phoneNumbers) {
    try {
      console.log('Before Parsing:', req.body.phoneNumbers);
      req.body.phoneNumbers = JSON.parse(req.body.phoneNumbers);
      console.log('After Parsing:', req.body.phoneNumbers);

      
      req.body.phoneNumbers = req.body.phoneNumbers.map(phoneNumber => {
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'IN'); 
        if (!phoneNumberObj || !phoneNumberObj.isValid()) {
          throw new Error('Invalid phone number format.');
        }
        return phoneNumberObj.number; 
      });

    } catch (err) {
      return res.status(400).json({ message: 'Invalid phoneNumber format,Check the Digits' });
    }
  }
  next();
};

module.exports = parsePhoneNumbers;
