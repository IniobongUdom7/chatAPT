import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';


// API KEY CONFIGURATIONS
dotenv.config()

const configuration = new Configuration ({
    apikey: process.env.OPEN_API_KEYS,
});

//OPENAI CONFIGURATIONS

const openai = new OpenAIApi(configuration);

//INITIALIZE OUR EXPRESS SERVER APPLICATION
const app = express();
app.use(cors());
app.use(express.json());

//GET ROUTE
app.get('/', async (req, res) => {
   res.status(200).send({
    message: 'Hello world'
   }) 

});

//POST ROUTE
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0.4,
        presence_penalty: 0,
         
    });

    res.status(200).send({
      bot: response.date.choices[0].text
    })

  } catch (error) {
       console.error(error)
       res.status(500).send(error || 'oops try again later')
  }
})

app.listen(5000, () => console.log('Our server is running on port http://localhost:5000'));






