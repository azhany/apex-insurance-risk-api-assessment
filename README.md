# insurance-risk-api-assessment

This repository contains a Node.js application that calculates the risk scores for different types of insurance based on user input. It includes a score calculation engine and an API endpoint to receive user data and return the calculated risk profile.

## Instructions to Run the Code

1. Clone the repository:

```
git clone https://github.com/azhany/insurance-risk-api-assessment.git  
```


2. Install the dependencies:

```
cd insurance-risk-api-assessment  
```
```
npm install  
```


3. Start the application:

```
npm start  
```

The server will start running on `http://localhost:3000`.


4. To calculate the risk profile, send a POST request to `http://localhost:3000/calculateRiskProfile` with the user data in the request body.

The required attributes include age, dependents, income, marital status, risk questions, house details (if applicable), and vehicle details (if applicable).

Example request payload:

```json
{
  "age": 35,
  "dependents": 2,
  "income": 0,
  "maritalStatus": "married",
  "riskQuestions": [false, true, false],
  "house": {"ownershipStatus": "owned"},
  "vehicle": {"year": 2018}
}
```


5. The server will calculate the risk profile based on the provided information and return the result in JSON format. The risk profile will include categories such as auto, disability, home, and life, with their respective insurance plans.

Example response payload:

```json
{
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular"
}
```


6. To run the unit tests, run the following command:

```
npm test
```


## Technical Details

- **Node.js**: The application is built using Node.js, which provides a lightweight and efficient runtime for building server-side applications.

- **Express**: The Express framework is used to handle the routing and middleware functionality, making it easy to set up the API endpoints.

- **TypeScript**: TypeScript is used for static typing, allowing for better code organization, maintainability, and early detection of errors.

- **Jest**: Jest is used as the testing framework for unit testing, providing a simple and intuitive way to write tests and assertions.


## Comments

- The insurance risk api is designed to be extensible, allowing for easy addition or modification of rules for calculating risk scores for different types of insurance.

- The application follows a modular structure, separating the score calculation engine logic from the API endpoint handling.

- The project has been tested and works as expected based on the provided requirements. However, additional testing and validation may be required based on specific use cases and edge cases.

- Contributions, bug reports, and suggestions are welcome. Feel free to open an issue or submit a pull request if you have any feedback or improvements.

