import { OpenAI } from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI({
  apiKey: configuration.apiKey,
});

export default async function (req, res) {
  console.log(`gptInference`)
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const foo = [
    {sec: 31,   speech: " Unit's responding on B3. This is going to be a report of a house fire in the area of Longmore and Linder. We've had one RP so far only. They're advising that a neighbor's house looks like it's on fire, saying it looks like it's fully engulfed. They're saying it's possibly 1564 West Linder, but they're not sure. And we have no further information so far. We've got PD en route as well."},
    {sec: 40,   speech: " Engine 207 to alarm on channel B3."},
    {sec: 47,   speech: " Go ahead."},
    {sec: 54,   speech: " On scene, 1564."},
    {sec: 97,   speech: " Dry level home with a pitch asphalt shingle roof. We have smoke showing from the backyard. You can see through the front window of the house. There's no smoke inside the home. NG207 will be Suma Command. Command will be Mobile Offensive. We do have our own water supply. It will be Linder Command. Accountability and no IREC at this time will be established."},
    {sec: 122,  speech: " Alarm copies, we have Engine 207 on scene at 1564 West Linder. We've got a dry mobile home, pitch asphalt, shingle roof. There is smoke showing in the backyard. It appears no smoke in the home. Engine 207 is assuming mobile command will be offensive. They have their own water supply. They're assuming Linder command. We're going to have no IRIC at this time."},
    // {sec: ,   speech: ""},
  ]

  let state = {}
  for (const obj of foo) {
    const sec = obj['sec']
    console.log(`sec:${sec}`)
    const speech = obj['speech']
    console.log(`speech:${speech}`)
    state = await sendRequest(speech, state)
    console.log(state)
    console.log('\n\n')
  }
  res.status(200).json({result: 'ok'})
}//default func

const sendRequest = async (speech, state) => {
// const model = 'gpt-3.5-turbo'
  const model = 'gpt-4-0613'

  try {
    let prompt = `
          Listen to the radio chatter between fire fighters during an emergency incident.  Try to determine the following information:
            - (radioChannel) Which radio channel are all responders using for this incident?  (radio channels have a letter and a number: A4, B1, etc.) 
            - (incidentLocation) What is the location of the incident?  (should be an address, cross streets, or some other navigable approximation) 
            - (units) Which units have been dispatched? (list of responding units using the call signs, eg: "Engine 123" would be represented as "E123")
            - (sectors) Which sectors are present? (should be a list of areas at the incident that the commander or fire fighters have identified. eg: "Roof", "Alpha Sector", "North Side", etc.)
            - (unitsToRoles) What roles or actions are assign to any units (eg: "Search and Rescue")
            - (nearestHydrant) Nearest hydrant (should be an address, cross streets, or some other navigable approximation)
            - (symptomsOnScene) Symptoms on the scene (should describe sensory indicators what can be seen, smelt, heard, etc.)
            - (structureDescription) Description of the structure (how many floors?  School?  Factory?  Residence? Warehouse? etc.)
            - (isWorkingFire) Is it a "working fire"? (true/false)
            - (strategy) Strategy: "defensive/offensive strategy"
            - (incidentClassification) Incident classifications: (eg: "working fire,", "defensive operations," "rescue operations," "hazardous materials," "multi-story building," "structure collapse," "mutual aid," and "medical assistance needed,")
            - (alarms) Alarms (1st, 2nd, etc.)
            - (victims) Where are people who need to be rescued? (list of # of people and where they are trapped - eg: 'Two people trapped on second floor')
            - (manyVictims) How many trapped victims are reported? (A number indicating the sum total of trapped victims that have been reported in the structure)
            - (waterNeeded) Where is water needed? (Descriptions of sectors or units who have called out requesting they need water brought to them)
            - (sectorsCleared) What sectors have been cleared? (List of sector names that fire fighters have called out have been 'cleared')
            - (commandUnit) Which unit is in command? (name of the sector that has been declared in command)
            - (resourcesNeeded) What resources/help is needed? (Any resources or help that has been requested on the radio, if possible make sure to include which unit made the request and which sector they are in)
            - (isParRequested) PAR requested (true/false - has a PAR been requested and is actively being collected?)
            - (parDeclared) Which units have declared PAR (if a PAR is being collected then which units have declared PAR? Should be a list of unit names)
        `
    // If not empty state:
    if (state && Object.keys(state).length > 0) {
      prompt = prompt + `
        Update the fields for this JSON object:
          ${state}
      `
    } else {
      prompt = prompt + `
        Reply ONLY with JSON data.  Format the JSON data like the following example:
            {
              radioChannel: "A1",
              incidentLocation: "Broadway and Main Street",
              units: ["E123", "L56", ...],
              sectors: ["Roof", "Alpha", ...],
              unitsToRoles: {
                "E123": "Search and rescue",
                ...
              ],
              nearestHydrant: "...",
              symptomsOnScene: "...",
              structureDescription: "...",
              isWorkingFire: true,
              strategy: "defensive",
              incidentClassification: "working fire",
              alarms: "first",
              victims: [
                "four people trapped on second floor",
                ...
              ],
              manyVictims: 2,
              waterNeeded: [
                "Second floor, unit E123",
                ...
              ],
              sectorsCleared: {
                "Second floor",
                ...
              },
              commandUnit: "E234",
              resourcesNeeded: [
                "E123 needs water",
                ...
              ],
              isParRequested: true,
              parDeclared: [ 
                "E123", "L56", ...
              ]
            }
      `
    }
    console.log(`prompt:${prompt}`)
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: prompt},
        {role: 'user', content: speech},
      ],
      model,
      temperature: 1,
    });
    // console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}