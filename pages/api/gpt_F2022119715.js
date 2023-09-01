import { OpenAI } from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI({
  apiKey: configuration.apiKey,
});

export default async function (req, res) {
  console.log("gpt")
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

  try {
    console.log('gpt_F2022119715')
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: `
          Listen to the radio chatter between fire fighters during an emergency incident.  Try to determine the following information:
            - Which units have been dispatched?
            - Which sectors are present?
            - What roles or actions are assign to any units
            - Nearest hydrant
            - Symptoms on the scene
            - Description of the structure
            - Category of concern and strategy: "working fire"
            - Stategy: "defensive/offensive strategy"
            - Incident classifications:
            - "working fire,", "defensive operations," "rescue operations," "hazardous materials," "multi-story building," "structure collapse," "mutual aid," and "medical assistance needed,"
            - Alarms (1st, 2nd, etc.)
            - Units are assigned to which hydrants
            - Lookup local area based on dispatch address and understand names of streets
            - Where are people who need to be rescued?
            - Where is water needed?
            - How many victims are reported?
            - What sectors have been cleared?
            - Which unit is in command?
            - What resources/help is needed?
            - PAR requested
            - Which units have declared PAR
            
            Please reply ONLY with JSON data.  Format the JSON data like the following example:
            {
              dispatchedUnits: ["E123", "L56", ...],
              sectors: ["Roof", "Alpha", ...],
              unitsToRoles: {
                "E123": "Search and rescue",
                ...
              ],
              nearestHydrant: "...",
              symptomsOnScene: "...",
              structureDescription: "...",
              categoryOfConcern: "working fire",
              strategy: "defensive",
              alarms: "first",
              victimsLocation: [
                "four people trapped on second floor",
                ...
              ],
              unitsToHydrants: {
                "E123": "Broadway and Main St",
                ...
              },
              sectorsCleared: {
                "Second floor",
                ...
              },
              commandUnit: "E234",
              resourcesHelpNeeded: [
                "E123 needs water",
                ...
              ],
              isParRequested: true,
              unitsToParReported: {
                "E123": true,
                "L56": false,
                ...
              }
            }
        `},
          //Reference
        // {role: 'user', content:  "Units responding on B3.  This is going to be a report of a house fire in the area of Longmore and Lindner.  We've had one RP so far only. They're advising that a neighbor's house looks like it's on fire.  Saying it looks like it's fully engulfed. They're saying it possibly 1564 West Lindner, but they're not sure. And we have no further information so far.  We've got PD en route as well."},
        // {role: 'user', content:  "Alarm copy.  We have Engine 207 on scene at 1564 West Lindner. Tri-level home pitched asphalt shingle roof.  There is smoke showing in the backyard. It appears no smoke in the home.  Engine 207 is assuming mobile command.  Will be offensive. They have their own water supply. They're assuming linear command.  We're going to have no IRIC at this time."},
        // {role: 'user', content:  "On scene, 1564."},
        // {role: 'user', content:  "Tri-level home with a pitched, asphalt shingle roof.  We have smoke showing from the backyard. Could see through the front window of the house. It appears there's no smoke inside the home. Engine 207 will be assuming command.  Command will be mobile, offensive.  We do have our own water supply.  We'll be linear command, accountability, and no IRIC at this time will be established."},
        // {role: 'user', content:  "Engine 207 to alarm on channel B3"},
        // {role: 'user', content:  "Engine 207, go ahead."},

          // Transcription
        {role: 'user', content:  " Unit's responding on B3. This is going to be a report of a house fire in the area of Longmore and Linder. We've had one RP so far only. They're advising that a neighbor's house looks like it's on fire, saying it looks like it's fully engulfed. They're saying it's possibly 1564 West Linder, but they're not sure. And we have no further information so far. We've got PD en route as well."},
        {role: 'user', content:  " Alarm copies, we have Engine 207 on scene at 1564 West Linder. We've got a dry mobile home, pitch asphalt, shingle roof. There is smoke showing in the backyard. It appears no smoke in the home. Engine 207 is assuming mobile command will be offensive. They have their own water supply. They're assuming Linder command. We're going to have no IRIC at this time."},
        {role: 'user', content:  " On scene, 1564."},
        {role: 'user', content:  " Dry level home with a pitch asphalt shingle roof. We have smoke showing from the backyard. You can see through the front window of the house. There's no smoke inside the home. NG207 will be Suma Command. Command will be Mobile Offensive. We do have our own water supply. It will be Linder Command. Accountability and no IREC at this time will be established."},
        {role: 'user', content:  " Engine 207 to alarm on channel B3."},
        {role: 'user', content:  " Go ahead."},
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
