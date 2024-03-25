import * as fs from "fs";
import http from "http";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const client = new TextToSpeechClient();

function stringToHash(string: string) {
  let hash = 0;

  if (string.length == 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

const server = http.createServer((req, res) => {
  if (req.url !== "/speech-to-text") {
    res.statusCode = 404;
    res.end("404");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const hash = stringToHash(body);

    if (fs.existsSync(`./files/${hash}.mp3`)) {
      console.log("cached");

      const answer = fs.createReadStream(`./files/${hash}.mp3`);

      answer.addListener("data", (chunk) => {
        res.write(chunk);
      });

      answer.addListener("close", () => {
        res.end();
      });

      return;
    }

    const [{ audioContent }] = await client.synthesizeSpeech({
      input: { ssml: body },
      voice: {
        languageCode: "en-GB",
        name: "en-GB-Standard-A",
        ssmlGender: "FEMALE",
      },
      audioConfig: { audioEncoding: "MP3" },
    });

    if (audioContent instanceof Uint8Array) {
      fs.writeFile(`./files/${hash}.mp3`, audioContent, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("The file has been saved!");
      });
    }

    res.end(audioContent);
  });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
