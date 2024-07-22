const { parsePhoneNumberFromString } = require('libphonenumber-js');

const parsePhoneNumber = (req, res, next) => {
  const { phone } = req.body;

  if (phone) {
    try {
      
      const phoneNumberObj = parsePhoneNumberFromString(phone);
      if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        throw new Error('Invalid phone number format.');
      }
      req.body.phone = phoneNumberObj.number; 
    } catch (err) {
      return res.status(400).json({ message: 'Invalid phone number format. Check the digits.' });
    }
  }

  next();
};

module.exports = parsePhoneNumber;
