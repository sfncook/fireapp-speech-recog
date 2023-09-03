import dataF2022119715 from '../../data/F2022119715.json'

export default async function (req, res) {
  if(req.query && req.query['getAllSec']) {
    const allStartSecs = dataF2022119715.map(d=>d.startSec)
    console.log(`getAllSec: ${allStartSecs}`)
    res.status(200).json(allStartSecs)
    return
  }

  const curSec = req.body.curSec
  console.log(`curSec ${curSec}`)
  try {
    // console.log(dataF2022119715.find(d => d.startSec === curSec))
    // res.status(200).json({result:{}});
    res.status(200).json({
      result: dataF2022119715.find(d => d.startSec === curSec),
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
