
module.exports = (app) => {
    app.get('/', (req, res) => {
      res.send(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                color: #333;
                text-align: center;
                padding: 50px;
              }
              h1 {
                color: #4CAF50;
              }
              p {
                font-size: 18px;
              }
            </style>
          </head>
          <body>
            <h1>Welcome to the Backend Server</h1>
            <p>This is the root endpoint of your server. You can access other API routes or the health check at /health.</p>
          </body>
        </html>
      `);
    });
  
    // Health check route ("/health")
    app.get('/health', (req, res) => {
      res.status(200).send(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f8ff;
                text-align: center;
                padding: 50px;
                margin: 0;
              }
              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              .status {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                border-radius: 5px;
                font-size: 24px;
                font-weight: bold;
              }
              .message {
                font-size: 18px;
                margin-top: 10px;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="status">
                Backend is Healthy
                <div class="message">
                  All systems are operational.
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
    });
  };
  