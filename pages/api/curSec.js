
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
    speech: " Unit's responding on B3. This is going to be a report of a house fire in the area of Longmore and Linder. We've had one RP so far only. They're advising that a neighbor's house looks like it's on fire, saying it looks like it's fully engulfed. They're saying it's possibly 1564 West Linder, but they're not sure. And we have no further information so far. We've got PD en route as well.",
    state: "{\n\"radioChannel\": \"B3\",\n\"incidentLocation\": \"1564 West Linder\",\n\"units\": [],\n\"sectors\": [],\n\"unitsToRoles\": {},\n\"nearestHydrant\": \"\",\n\"symptomsOnScene\": [\"Fully engulfed house fire\"],\n\"structureDescription\": \"House\",\n\"isWorkingFire\": true,\n\"strategy\": \"\",\n\"incidentClassification\": [],\n\"alarms\": [],\n\"victims\": [],\n\"manyVictims\": 0,\n\"waterNeeded\": [],\n\"sectorsCleared\": [],\n\"commandUnit\": \"\",\n\"resourcesNeeded\": [\"PD en route\"],\n\"isParRequested\": false,\n\"parDeclared\": []\n}",
  },
  // 40: {
  //   speech: ,
  //   state: ,
  // },
  // 47: {
  //   speech: ,
  //   state: ,
  // },
  // 54: {
  //   speech: ,
  //   state: ,
  // },
  // 97: {
  //   speech: ,
  //   state: ,
  // },
  // 122: {
  //   speech: ,
  //   state: ,
  // },
}