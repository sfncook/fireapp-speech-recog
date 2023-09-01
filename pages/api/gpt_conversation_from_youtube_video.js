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

  // const model = 'gpt-3.5-turbo'
  const model =  'gpt-4-0613'

  try {
    console.log('Sending to GPT...')
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
        `},
        // {role: 'user', content: voiceText},
        // {role: 'user', content:  'Engine 11 is on the scene of a large two‐story school with a working fire on the second floor. Engine 11 is laying a supply line and going in with a hand‐line to the second floor for search & rescue and fire attack. This is an offensive fire attack. Engine 11 will be 7th Street Command.'},
        // {role: 'user', content:  'Engine 11 is on the scene of a medium size warehouse fully involved with exposures to the east. Engine 11 is laying a supply line and attacking the fire with a stang gun and a hand‐line to the east exposure to check for extension. This is a defensive fire.  Engine 11 will be Buckeye Command.'},
        // {role: 'user', content:  'Engine 11 will be North side accountability. Give me the balance a 1st Alarm.'},
        // {role: 'user', content:  "Ladder 11 is on the scene with a multi‐vehicle accident. Give me the balance of a 2 and 1 medical with three ambulances. Ladder 11 will be Parkway Command."},
        {role: 'user', content:  "construction workers on site, be advised that, trailer's on fire inside of a parking deck. the trailer's not attached to a truck nobody's inside.  They have evacuated the parking deck at this time."},
        {role: 'user', content:  "I have a hydrant at 4807 Barkley Downs Drive"},
        {role: 'user', content:  "Caller advises smell of natural gas in her bedroom "},
        {role: 'user', content:  "Closest hydrant would be fox cross road and corgy roads"},
        {role: 'user', content:  "Working fire for a midrise"},
        {role: 'user', content:  "Engine two in route"},
        {role: 'user', content:  "14, upon your arrival come in on Berkley Downs and catch the hydrant directly in front of us."},
        {role: 'user', content:  "Go around the other side of the structure and see if you can see the fire on the first floor"},
        {role: 'user', content:  "Copy head around the other side of the structure and see if we can see it."},
        {role: 'user', content:  "10/4"},
        {role: 'user', content:  "I got somebody telling me you got two people on floor four can't get out"},
        {role: 'user', content:  "We got two workers on floor four who can't get out. Is that correct?"},
        {role: 'user', content:  "That's affirmative."},
        {role: 'user', content:  "I got two trapped on the sixth floor over here on the bravo side, bravo side, sixth floor."},
        {role: 'user', content:  "Hey I need an additional resource to the back of ladder 16 to assist me setting up a forty footer"},
        {role: 'user', content:  "Ten four"},
        {role: 'user', content:  "On the first floor fire is on the second, burning above."},
        {role: 'user', content:  "Repeat your traffic"},
        {role: 'user', content:  "Is medic holding this call?  Or is it en route?"},
        {role: 'user', content:  "Still trying to figure out some more.  Language barrier."},
        {role: 'user', content:  "Ladder two: make your way right in front of ladder 16 help them setup a 40 footer and make a rescue of the 4th floor"},
        {role: 'user', content:  "We're on the opposite of you, the contrators saying we have a direction shot in from this side about 150 feet in, we're gonna make an attempt."},
        {role: 'user', content:  "For a fire attack, correct?"},
        {role: 'user', content:  "Attempts on fire attack, yes."},
        {role: 'user', content:  "Copy, do you have a water supply on the c-side?  On your side?"},
        {role: 'user', content:  "We do not."},
        {role: 'user', content:  "Copy."},
        {role: 'user', content:  "We're getting a report of one victim so far"},
        {role: 'user', content:  "Upstairs are clear"},
        {role: 'user', content:  "Gimme one sec, we're just checking the downstairs right now."},
        {role: 'user', content:  "Command alarm and all companies, car 10 will now have command. I'm going to strike a third alarm.  Staging, go ahead and figure out staging for a second as well as a third."},
        {role: 'user', content:  "Command to Battlion 5. "},
        {role: 'user', content:  "Battalion 7 to command. I'm on your charlie side."},
        {role: 'user', content:  "Command to alarm have cmpd shut down all traffic at Fairview Road where I'm at."},
        {role: 'user', content:  "Command to battalion 5."},
        {role: 'user', content:  "go ahead"},
        {role: 'user', content:  "Battalion 5 you will now be search and rescue"},
        {role: 'user', content:  "Command to battalion 7"},
        {role: 'user', content:  "Go ahead "},
        {role: 'user', content:  "Seven, you will be fire attack"},
        {role: 'user', content:  "Seven copies fire attack"},
        {role: 'user', content:  "Engine 24 to Enging 12 do you have that supply line linked to you by 39? or no?"},
        {role: 'user', content:  "We're reversing out right now for ladder 24"},
        {role: 'user', content:  "Get chris out there now"},
        {role: 'user', content:  "Command I need water to ladder 2, i need water to ladder 2"},
        {role: 'user', content:  "Command to all companies, command to all companies, back out of the structure"},
        {role: 'user', content:  "Everybody on ladder 2 get down.  Move that ladder"},
        {role: 'user', content:  "Can we get a PAR?"},
        {role: 'user', content:  "I'm working on it.  Command alarm go ahead and start the PAR.  Be quick with it."},
        {role: 'user', content:  "Ladder 24 your water's comin"},
        {role: 'user', content:  "Command alarm, go ahead and continue with the par"},
        {role: 'user', content:  "10-4 command"},
        {role: 'user', content:  "Engine 14 PAR"},
        {role: 'user', content:  "Alarm to engine 2 PAR"},
        {role: 'user', content:  "Engine 2 PAR"},
        {role: 'user', content:  "Alarm, ladder 16 PAR"},
        {role: 'user', content:  "Ladder 16 PAR."},
        {role: 'user', content:  "Alarm, rescue 11 PAR"},
        {role: 'user', content:  "Rescue 11 PAR"},
        {role: 'user', content:  "Alarm engine 43 PAR"},
        {role: 'user', content:  "43's PAR"},
        {role: 'user', content:  "Alarm ladder 1 PAR"},
        {role: 'user', content:  "PAR"},
        {role: 'user', content:  "Alarm Ladder 2 PAR"},
        {role: 'user', content:  "Command urgent message"},
        {role: 'user', content:  "Go ahead with the urgent"},
        {role: 'user', content:  "Reported, still have 2 workers, number 6 floor, in the open area"},
        {role: 'user', content:  "Safety one to command"},
        {role: 'user', content:  "Go ahead"},
        {role: 'user', content:  "Alright, where are you located at?"},
        {role: 'user', content:  "Alpha side, which will be Barkley Downs"},
        {role: 'user', content:  "Engine 24 PAR"},
        {role: 'user', content:  "Engine 24 PAR"},
        {role: 'user', content:  "Engine 39 PAR"},
        {role: 'user', content:  "39 PAR"},
        {role: 'user', content:  "Ladder 24 PAR"},
        {role: 'user', content:  "Literally just pulling up"},
        {role: 'user', content:  "Command to all companies we will be defenseive at this time.  Going to change command structure.  Command to Battalion 5, you're now the a-division on Barclay Downs.  Command to Battalion 7 you're now the charlie division off of Fairview"},
        {role: 'user', content:  "Car 21 to command we still have a crane operator in the crane between the bravo and bravo exposure.  he's stuck on the platform trying to get out"},
        {role: 'user', content:  "Engine 10 to command, we're working on the tower crane guy"},
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
