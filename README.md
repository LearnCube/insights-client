# LearnCube Insights Client

### [Overview](README.md)

* [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)

* [Versions](PRODUCTION.md#versions)
* [Routes](PRODUCTION.md#routes)
* [Authentication](AUTH.md#authentication)
* [Events](PRODUCTION.md#events)
* [Client Api Reference](PRODUCTION.md#api-reference)

### Overview
LearnCube Insights is a cloud-based dashboard that provides reporting and analysis of your LearnCube classrooms and users. 

<img src="/public/insights.png" />


<br/>

### Quickstart Guide 

LearnCube's Insights Client is a simple to use drop-in widget that allows you to embed the dashboard in any web page or LMS.

LearnCube's Insights is only available to LearnCube customers with API access enabled. Getting started is simple. 

- Log in to your [LearnCube Account](https://app.learncube.com/), or [Sign up here for free](https://app.learncube.com/app/create/).
- Get your public and private [API keys here](https://app.learncube.com/app/dashboard/#api) from your LearnCube API Dashboard. (Leave the account mode to testing in order to follow this example)
- Clone the quickstart app to your local machine and cd into the directory

  ```shell 
  git clone https://github.com/LearnCube/insightsclient.git
  cd insightsclient
  ```

- Create a configuration file for your application.
  
  ```shell
  cp template.env .env
  ```
  
- Replace the variables in the newly created `.env` file with real data from your LearnCube API account. 

  ```
  # Private Key
  privateKey={privatekeyfromyouraccount}

  # LearnCube user username
  username={usernamefromyouraccount}

  # LearnCube user id
  user_id={useridfromyouraccount}

  # LearnCube user email
  email={emailyouusedtosignup}
  ```
  ***Important: This must match the user data we have stored for the LearnCube account holder.***

- Replace the user data in the `index.html` file with user data of a teacher or admin. 

  ```html
      <div id="insights-client"></div>
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/reporting.css">
      <script type="text/javascript" src="https://static.learncube.net/client/reporting.js"></script>
      <script type="text/javascript">
          const reporting = new VcReporting('#insights-client',
              {
                  'userid': {{TEST USER ID HERE}}, // Eg. 12345G
                  'username': {{TEST USERNAME HERE}}, // Eg. 'Test Widget Teacher',
                  'publicKey': {{YOUR PUBLIC KEY HERE}}',
                  'userType': 'admin', // Eg. 'admin | teacher | student'
                  'validateUrl': '/get-valid-token/'
              });
      </script>
  ```

- Install dependencies and run 
  ```shell
  npm install
  npm start
  ```

- Navigate to http://localhost:3001 to view your Insights.

<br/>
