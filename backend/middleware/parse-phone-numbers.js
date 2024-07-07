const parsePhoneNumbers = (req, res, next) => {
    if (req.body.phoneNumbers) {
      try {
        console.log('Before Parsing:', req.body.phoneNumbers);
        req.body.phoneNumbers = JSON.parse(req.body.phoneNumbers);
        console.log('After Parsing:', req.body.phoneNumbers);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid phoneNumbers format' });
      }
    }
    next();
  };
  
  module.exports = parsePhoneNumbers;
  