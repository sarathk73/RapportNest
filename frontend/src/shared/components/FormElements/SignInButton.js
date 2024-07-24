import React, { useEffect } from 'react';

const SignInButton = ({ onPhoneVerified }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.querySelector('.pe_signin_button').appendChild(script);

    window.phoneEmailListener = function(userObj) {
      const user_json_url = userObj.user_json_url;
      fetch(user_json_url)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Data: ", data); 
          
          const phoneNumber = data.user_phone_number || 'Not available';
          const countryCode = data.user_country_code || 'Not available';

         
          if (phoneNumber === 'Not available' || countryCode === 'Not available') {
            console.error("Phone number or country code missing from response data");
          } else {
            const fullPhoneNumber = `${countryCode}${phoneNumber}`;
            onPhoneVerified(fullPhoneNumber);
          }
        })
        .catch(error => console.error('Error fetching phone number:', error));
    };

    return () => {
      window.phoneEmailListener = null;
    };
  }, [onPhoneVerified]);

  return (
    <div className="pe_signin_button" data-client-id="14724806876563276160"></div>
  );
};

export default SignInButton;
