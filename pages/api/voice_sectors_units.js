import { OpenAI } from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI({
  apiKey: configuration.apiKey,
});

export default async function (req, res) {
  console.log("voice")
  console.log(req.body)
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // const model = 'gpt-3.5-turbo'
  const model =  'gpt-4-0613'

  try {
    const voiceText = req.body.voiceText
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: `
          Determine if the user is mentioning a sector from this list of possible sectors: ("Interior", "Sector 1", "North Sector", "A-Side Sector", "Sector 2", "Eat Sector", "Bravo Sector", "Ventilation", "Sector 3", "South Sector", "Charlie Sector", "Roof", "Sector 4", "West Sector", "Delta Sector", "On Deck", "Overhaul", "IRIC", "Medical", "Staging", "Salvage", "RIC", "Triage", "Lobby", "Customer Service", "RESCUE", "Treatment", "Accountability", "Evacuation", "Safety", "Transportation", "Resource", "ReHab").
          Possible misellings for the sectors:
            "IRIC": "pirate", "Iraq", "hi rick"
          The floors of buildings can also be their own sector and should be listed in the response like "Floor 2" or "Ground Floor"
          If the user names some area of the emergency scene that is not in the list then that should be considered the name of a new sector.  For example: "Alley", "Basement", "Parking Lot", or "Back Yard"
          Sector names can also be a reference to the direction or side of a building "east", "west", etc.  You should give these sectors names that include the direction and the word "Sector" for example: "East Sector" or "West Sector" 
          
          Also determine if the user is mentioning a unit.  Unit names often start with an unit type (like "Engine" or "Ladder") and then have a numeric designation like "284" or "12".  Your response should use the abbreviation for the unit type and the number so "Engine twelve" should be "E12".  Here are the common abbreviation definitions:
            "E" = "Engine"
            "L" = "Ladder" 
            "BC" = "Battalion Chief" or just "Chief"
            "SQ" = "Squad"
            "Br" = "Brush"
          Other units don't have numbers, just pure unit types, like "Ambo", "Native Air", or "Life Net"
            
          Try to determine which sectors units are being assigned to.  If a unit is on scene but is not specifically assigned to a sector then don't mention it in the unitAssignments.
          
          Try to determine if any units are being assigned as "accountability".  If a unit is on scene but is not specifically assigned to accountability then don't mention it in the accountability component of the response.
          
          Reply with the following JSON structure:
          {
            sections: ["Interior", "Roof"],
            units: ["E284", "L281"],
            unitAssignments: [
              {
                sector: "Interior",
                unit: "E284"
              }
            ],
            accountability: ["L281"] 
          }
        `},
        // {role: 'user', content: voiceText},
        // {role: 'user', content: `Add north sector`},
        // {role: 'user', content: `Add north sector`},
        // {role: 'user', content: `Add north, south, eat, and safety.  Engine100 goes to North, Ladder 200 is in eat`},
        // {role: 'user', content:  'Engine 11 is on the scene of a large two‐story school with a working fire on the second floor. Engine 11 is laying a supply line and going in with a hand‐line to the second floor for search & rescue and fire attack. This is an offensive fire attack. Engine 11 will be 7th Street Command.'},
        {role: 'user', content:  'Engine 11 is on the scene of a medium size warehouse fully involved with exposures to the east. Engine 11 is laying a supply line and attacking the fire with a stang gun and a hand‐line to the east exposure to check for extension. This is a defensive fire.  Engine 11 will be Buckeye Command.'},
        // {role: 'user', content:  'Engine 11 will be North side accountability. Give me the balance a 1st Alarm.'},
        // {role: 'user', content:  "Ladder 11 is on the scene with a multi‐vehicle accident. Give me the balance of a 2 and 1 medical with three ambulances. Ladder 11 will be Parkway Command."},
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
