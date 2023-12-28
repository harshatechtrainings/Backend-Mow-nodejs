// your-module.test.js
const { expect } = require('chai');
const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');

/**Unit cases are not working yet. Implement when there was a proper functions ofr unit testing */
describe('Your Module', () => {
  it('should do something', async () => {


    try {
      // Your test logic
      const result = await authController.add("sree1", "sree1"); // Replace with your actual function
      console.log(result);

      // Assuming result is a value you want to assert
      // Replace with a meaningful assertion based on the actual result structure
      expect(result).to.equal("sree1sree1"); // Replace with your expected value or a meaningful comparison
    } catch (error) {
      // Log any errors that occur during the test
      console.error(error);
      throw error; // Rethrow the error to ensure the test fails
    }
  }).timeout(5000);
  
  // Add more test cases as needed
});

