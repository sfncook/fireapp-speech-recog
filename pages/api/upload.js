const vision = require('@google-cloud/vision');

export default async function (req, res) {

  // console.log(req.body)
  // let base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA'; // Not a real image
  const base64String = req.body.imgData
  const base64Image = base64String.split(';base64,').pop();
  const decodedImageBuffer = Buffer.from(base64Image, 'base64');

  try {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(decodedImageBuffer);
    const textAnnotations = result.textAnnotations;
    if(!textAnnotations.length) console.log("Empty response")
    textAnnotations.forEach(t => {
      console.log(t.boundingPoly.vertices)
      console.log(t.description)
    });
  } catch (err) {
    console.error('Error gcp ocr image:', err);
    return res.status(500).json(err);
  }

  res.status(200).json({"status":"ok"});

}//default func
