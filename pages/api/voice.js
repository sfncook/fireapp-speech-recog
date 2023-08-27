import { OpenAI } from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI({
  apiKey: configuration.apiKey,
});

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const model = 'gpt-3.5-turbo'
  // const model =  'gpt-4-0613'

  console.log('calling')
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: `
          This is the "initial on-scene radio report" from an incident commander who is first to arrive at
          a large scale emergency incident.  Derive as many of the following items as you can from what they say:
            1. "unit designation": 
              - Which emergency unit (ie "vehicle") is being designated to the scene initially?
            2. "building/area description":
              - How is the commander describing the building or area they are responding to?  Their description may include the following details:
              - Occupancy
              - Size (large, medium, small)
              - Height (assumed 1 story unless reported otherwise)
            3. "problems and conditions": 
              - Are there any obvious problems, concerns they see when they arrive? 
              - What are the visual indicators of fire?
              - Generally this should be one of the following items:
                - Nothing showing (indicates checking)
                - Smoke showing (amount and location)
                - Fire showing (amount and location)
                - Working fire
                - Fully involved
            4. "action taken":
              - Assuming command
              - Laying a line
              - Attacking with…etc.
              - etc.
            5. "strategy":
              - Either Offensive or defensive
            6. "command confirmation":
              - This statement generally indicates which unit the user is assigned to, where they are located and perhaps the name of the command center where they are located
          Respond with only a JSON structure. 
        `},
        // {role: 'user', content: `Add north sector`},
        // {role: 'user', content: `Add north, south, eat, and safety.  Engine100 goes to North, Ladder 200 is in eat`},
        // {role: 'user', content:  'Engine 11 is on the scene of a large two‐story school with a working fire on the second floor. Engine 11 is laying a supply line and going in with a hand‐line to the second floor for search & rescue and fire attack. This is an offensive fire attack. Engine 11 will be 7th Street Command.'},
        // {role: 'user', content:  'Engine 11 is on the scene of a medium size warehouse fully involved with exposures to the east. Engine 11 is laying a supply line and attacking the fire with a stang gun and a hand‐line to the east exposure to check for extension. This is a defensive fire.  Engine 11 will be Buckeye Command.'},
        {role: 'user', content:  "Ladder 11 is on the scene with a multi‐vehicle accident. Give me the balance of a 2 and 1 medical with three ambulances. Ladder 11 will be Parkway Command."},
      ],
      model,
      temperature: 1,
    });
    console.log(completion.choices[0].message.content)
    res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }//catch
}//default func
