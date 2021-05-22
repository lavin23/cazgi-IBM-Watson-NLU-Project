const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

//creates NLU moved out of each app.get call
//first time using an .env file, make sure its added to .gitignore
function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const nlu = new getNLUInstance();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

//each .get is fairly similar, first declare parameters
//to access the data ? = query : = param so ?url=ibm.com would be
//req.query.url = ibm.com
//then send parameters through analyze function of nlu, with a promise
app.get("/url/emotion", (req,res) => {
    const params = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'document': true //default is true, but failed to start without it. investigate more?
            },
        },
    };
nlu.analyze(params)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));

    return res.send(analysisResults.result.emotion.document.emotion);
  })
  .catch(err => {
      console.log('error:', err);
  });
});

app.get("/url/sentiment", (req,res) => {
    const params = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'document': true
            },
        },
    };
nlu.analyze(params)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));

    return res.send(analysisResults.result.sentiment.document.label);
  })
  .catch(err => {
      console.log('error:', err);
  });
});

app.get("/text/emotion", (req,res) => {
    const params = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true
            },
        },
    };
nlu.analyze(params)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));

    return res.send(analysisResults.result.emotion.document.emotion);
  })
  .catch(err => {
      console.log('error:', err);
  });
});

app.get("/text/sentiment", (req,res) => {
    const params = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'document': true
            },
        },
    };
nlu.analyze(params)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));

    return res.send(analysisResults.result.sentiment.document.label);
  })
  .catch(err => {
      console.log('error:', err);
  });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

