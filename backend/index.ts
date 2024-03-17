import * as fs from "fs";
import http from "http";
// import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// const client = new TextToSpeechClient();

const answer = fs.readFileSync("./files/output.mp3");

const server = http.createServer((req, res) => {
  if (req.url !== "/speech-to-text") {
    res.statusCode = 404;
    res.end("404");
    return;
  }

  // let body = "";
  // req.on("data", (chunk) => {
  //   body += chunk.toString();
  // });

  res.end(new Uint8Array(answer));
  // req.on("end", async () => {
  // const [{ audioContent }] = await client.synthesizeSpeech(
  //   {
  //     input: { ssml: body },
  //     voice: {
  //       languageCode: "en-GB",
  //       name: "en-GB-Standard-A",
  //       ssmlGender: "FEMALE",
  //     },
  //     audioConfig: { audioEncoding: "MP3" },
  //   },
  //   { retryRequestOptions: {} },
  // );
  //
  // if (audioContent instanceof Uint8Array) {
  //   fs.writeFile("./files/output.mp3", audioContent, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log("The file has been saved!");
  //   });
  // }
  //
  // res.end(audioContent);
  // });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
