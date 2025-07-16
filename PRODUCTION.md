# LearnCube Insights Client

### [Overview](README.md)

* [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)

* [Versions](PRODUCTION.md#versions)
* [Routes](PRODUCTION.md#routes)
* [Authentication](AUTH.md#authentication)
* [Events](PRODUCTION.md#events)
* [Client Api Reference](PRODUCTION.md#api-reference)


### Production Use

The LearnCube Insights Client is a single page Javascript web application, that can be seamlessly embedded in any HTML
page and rendered in a browser.

### Versions
The most up-to-date production version of the LearnCube Insights Client files will always be accessible at:
```html
  <!-- Insights -->  
  <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/reporting.css">
  <script type="text/javascript" src="https://static.learncube.net/client/reporting.js"></script>
```   

From time-to-time, to ensure we always have backwards compatibility, advance testing of beta features will be made
available to users through versioned files. Eg:

```html
  <!-- Insights with new reports -->
<link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/reporting.1.2.0css">
<script type="text/javascript" src="https://static.learncube.net/client/reporting.1.2.0js"></script>
```

Once features have passed our internal QA and testing processes, they will be merged into the main branch and released
to general audience through the non-versioned files.

***To ensure you will always have the latest features in the most stable environment possible, the unversioned
files should be used in production.***

### Authentication

All API calls from the Insights Client must be authenticated using JSON Web Tokens. For more information on
this see [Authentication](AUTH.md#authentication)


### Routes

The Insights Client uses hash routes to navigate you through the various views available. To avoid any conflicts,
please ensure that the page where the client code is embedded does not use hash routes.


### Events

The Insights Client emits [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to allow naviation between other Learncube services.

You can execute your custom navigation functionality by attaching event listeners to the DOM element returned by the Insights Client
constructor function.

Each event contains a detail object that has the timestamp of when the event occurred and additional data about the
event.

There is a full list of available events below in the [API Reference](#api-reference)

```javascript
const reporting = new VcReporting(el, userConfig)

reporting.addEventListener('enterClassReview', function (evt) {
    const user = evt.detail.user;
    const token = evt.detail.token
    const timestamp = evt.detail.timestamp;
    console.log('Redirect to your own custom url to view the class with the token: ' + token + ' at '  + timestamp)
});

reporting.addEventListener('enterHomework', function (evt) {
    const user = evt.detail.user;
    const token = evt.detail.token
    const timestamp = evt.detail.timestamp;
    console.log('Redirect to your own custom url to view the homework with the token: ' + token + ' at '  + timestamp)
});

reporting.addEventListener('enterRecording', function (evt) {
    const user = evt.detail.user;
    const token = evt.detail.token
    const timestamp = evt.detail.timestamp;
    console.log('Redirect to your own custom url to view the recording with the token: ' + token + ' at '  + timestamp)
});

```

### API Reference

#### Constructor

```javascript
const reporting = new VcReporting(el, userConfig)
```

#### Parameters

 Name        | Type   | Required | Description                                                                
-------------|--------|----------|----------------------------------------------------------------------------|
 el          | string | yes      | The id attribute of the DOM element in which to embed the VirtualClassroom |
 userConfig  | object | yes      | Contains user data to validate and connect to the class                    |

#### Returns

The constructor returns the DOM element passed in as the first parameter. Event listeners can be attached to this
element to handle custom events dispatched from the LearnCube Insights Client.

<br/>
<br/>

#### User Config
```javascript
const userConfig = {
    'publicKey': {{PUBLICKEY}},
    'userid': {{PARTICIPANTID}},
    'username': {{PARTICIPANTNAME}},
    'userType': {{'admin'|'teacher'|'student'}},
    'validateUrl': {{auth.your-server.com}}
}
```

 Name         | Type    | Required | Default     | Description                                                                                                                                                                              
--------------|---------|----------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 publicKey    | string  | yes      | n/a         | The unique [public key](https://app.learncube.com/app/dashboard/#api) that is associated with your LearnCube account. This is how we identify you and what we use for authenticating API calls. |
 userid       | string  | yes      | n/a         | This is the id of the participant that is viewing the insights. Each user must have a unique id .                                                                                        |
 username     | string  | no       | ' '         | This is the display name of the participant that is entering the insights.                                                                                                               |
 userType     | string  | no       | student     | User type to define permissions for the current user.                                                                                                                             |
 validateUrl  | url     | yes      | n/a         | URL endpoint to do the validation on your server.                                                                                                                                        |

<br/>


#### Events

 Name              | Triggered By                                                   | Example Payload                                                                                                                                                                                                                          | 
-------------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 enterClassReview  | Clicking link to enter a class review from the past class list | `{token: 'class-token', user: {...}, timestamp: 1629449473109}`                                                                                                                                                                  
 enterHomework     | Clicking link to enter homework from the past class list       | `{token: 'class-token', user: {...}, timestamp: 1629449473109}`                                                                                                                                                                  
 enterRecording    | Clicking link to view a recording from the past class list     | `{token: 'class-token', user: {...}, timestamp: 1629449473109}`                                                                                                                                                                  

