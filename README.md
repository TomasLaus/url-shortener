# URL Shortener Microservice

This project is a URL shortener microservice built with Express.js and Mongoose. It allows users to submit a URL and receive a shortened version of it. When users access the shortened URL, they will be redirected to the original URL.

## Features

- **URL Shortening:** Users can submit URLs to receive a shortened version.
- **Redirection:** Accessing a shortened URL redirects to the original URL.
- **Error Handling:** Submitting an invalid URL returns an error message.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- HTML & CSS for the frontend

## Setup and Installation

1. Clone the repository:


2. Install dependencies:

3. Set up environment variables:
Create a `.env` file in the root directory and add your 
- MONGO_URI:
- PORT:


4. Run the server: `npm start`


## Usage

To shorten a URL, navigate to the homepage and enter a URL in the provided form. Submitting the form will return a JSON object containing the original URL and the shortened URL.

Access the shortened URL by navigating to `/api/shorturl/<short_url>` where `<short_url>` is the shortened URL returned by the service.

## Contributing

Contributions to the URL Shortener Microservice are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

