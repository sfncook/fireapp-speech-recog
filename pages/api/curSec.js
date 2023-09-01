
export default async function (req, res) {
  const curSec = req.body.curSec
  console.log(`curSec ${curSec}`)
  try {
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

const secToState = {
  31: {
    "radioChannel": "B3",
    "incidentLocation": "1564 West Linder",
    "units": [],
    "sectors": [],
    "unitsToRoles": {},
    "nearestHydrant": "",
    "symptomsOnScene": "Fully engulfed house fire",
    "structureDescription": "House",
    "isWorkingFire": true,
    "strategy": "",
    "incidentClassification": "",
    "alarms": "",
    "victims": [],
    "manyVictims": 0,
    "waterNeeded": [],
    "sectorsCleared": [],
    "commandUnit": "",
    "resourcesNeeded": [],
    "isParRequested": false,
    "parDeclared": []
  },

  122: {
    "radioChannel": "unknown",
    "incidentLocation": "1564 West Linder",
    "units": ["Engine 207"],
    "sectors": ["unknown"],
    "unitsToRoles": {
      "Engine 207": "mobile command"
    },
    "nearestHydrant": "unknown",
    "symptomsOnScene": "Smoke showing in the backyard. It appears no smoke in the home.",
    "structureDescription": "Dry mobile home, pitch asphalt, shingle roof.",
    "isWorkingFire": false,
    "strategy": "offensive",
    "incidentClassification": "unknown",
    "alarms": "unknown",
    "victims": [],
    "manyVictims": 0,
    "waterNeeded": [],
    "sectorsCleared": [],
    "commandUnit": "Engine 207",
    "resourcesNeeded": [],
    "isParRequested": false,
    "parDeclared": []
  }
}