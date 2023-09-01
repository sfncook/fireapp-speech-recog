
export default async function (req, res) {
  if(req.query && req.query['getAllSec']) {
    const respon = Object.keys(secToState)
    console.log(`getAllSec: ${respon}`)
    res.status(200).json(respon)
    return
  }

  const curSec = req.body.curSec
  console.log(`curSec ${curSec}`)
  try {
    res.status(200).json({
      result: secToState[curSec],
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
  // 31: {
  1: {
    speech: " Unit's responding on B3. This is going to be a report of a house fire in the area of Longmore and Linder. We've had one RP so far only. They're advising that a neighbor's house looks like it's on fire, saying it looks like it's fully engulfed. They're saying it's possibly 1564 West Linder, but they're not sure. And we have no further information so far. We've got PD en route as well.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": [],
      "sectors": [],
      "unitsToRoles": {},
      "nearestHydrant": "",
      "symptomsOnScene": "House looks fully engulfed",
      "structureDescription": "Neighbor's House",
      "isWorkingFire": true,
      "strategy": "",
      "incidentClassification": "house fire",
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
  },
  // 40: {
  2: {
    speech: "Engine 207 to alarm on channel B3.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": ["E207"],
      "sectors": [],
      "unitsToRoles": {},
      "nearestHydrant": "",
      "symptomsOnScene": "House looks fully engulfed",
      "structureDescription": "Neighbor's House",
      "isWorkingFire": true,
      "strategy": "",
      "incidentClassification": "house fire",
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
  },
  // 47: {
  3: {
    speech: "Go ahead.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": ["E207"],
      "sectors": [],
      "unitsToRoles": {},
      "nearestHydrant": "",
      "symptomsOnScene": "House looks fully engulfed",
      "structureDescription": "Neighbor's House",
      "isWorkingFire": true,
      "strategy": "",
      "incidentClassification": "house fire",
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
  },
  // 54: {
  4: {
    speech: "On scene, 1564.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": ["E207"],
      "sectors": [],
      "unitsToRoles": {},
      "nearestHydrant": "",
      "symptomsOnScene": "House looks fully engulfed",
      "structureDescription": "Neighbor's House",
      "isWorkingFire": true,
      "strategy": "",
      "incidentClassification": "house fire",
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
  },
  // 97: {
  5: {
    speech: "Dry level home with a pitch asphalt shingle roof. We have smoke showing from the backyard. You can see through the front window of the house. There's no smoke inside the home. NG207 will be Suma Command. Command will be Mobile Offensive. We do have our own water supply. It will be Linder Command. Accountability and no IREC at this time will be established.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": ["E207"],
      "sectors": [],
      "unitsToRoles": {
        "E207": "Suma Command"
      },
      "nearestHydrant": "",
      "symptomsOnScene": "Smoke showing from the backyard. No smoke inside the home",
      "structureDescription": "Single level Home with pitch asphalt shingle roof",
      "isWorkingFire": true,
      "strategy": "offensive",
      "incidentClassification": "house fire",
      "alarms": "",
      "victims": [],
      "manyVictims": 0,
      "waterNeeded": [],
      "sectorsCleared": [],
      "commandUnit": "NG207",
      "resourcesNeeded": [],
      "isParRequested": false,
      "parDeclared": []
    },
  },
  // 122: {
  6: {
    speech: "Alarm copies, we have Engine 207 on scene at 1564 West Linder. We've got a dry mobile home, pitch asphalt, shingle roof. There is smoke showing in the backyard. It appears no smoke in the home. Engine 207 is assuming mobile command will be offensive. They have their own water supply. They're assuming Linder command. We're going to have no IRIC at this time.",
    state: {
      "radioChannel": "B3",
      "incidentLocation": "1564 West Linder",
      "units": ["E207"],
      "sectors": [],
      "unitsToRoles": {
        "E207": "Linder Command"
      },
      "nearestHydrant": "",
      "symptomsOnScene": "Smoke showing in the backyard. Appears no smoke in the home",
      "structureDescription": "Single level Mobile Home with pitch asphalt shingle roof",
      "isWorkingFire": true,
      "strategy": "offensive",
      "incidentClassification": "house fire",
      "alarms": "",
      "victims": [],
      "manyVictims": 0,
      "waterNeeded": [],
      "sectorsCleared": [],
      "commandUnit": "E207",
      "resourcesNeeded": [],
      "isParRequested": false,
      "parDeclared": []
    },
  }
}