import { TextPlugDTO } from "./types.ts";

export const textPlugMock: TextPlugDTO = Array(1)
  .fill(null)
  .flatMap(() => [
    { type: "header", content: "What Does Lorem Ipsum Mean?" },
    {
      type: "paragraph",
      content:
        "Lorem ipsum, in graphical and textual context, refers to filler text that is placed in a document or visual presentation. Lorem ipsum is derived from the Latin “dolorem ipsum” roughly translated as “pain itself.”",
    },
    {
      type: "paragraph",
      content:
        "Lorem ipsum presents the sample font and orientation of writing on web pages and other software applications where content is not the main concern of the developer.",
    },
    { type: "paragraph", content: "Techopedia Explains Lorem Ipsum" },
    {
      type: "paragraph",
      content:
        "Lorem ipsum is the filler text that typically demonstrates the font and style of a text in a document or visual demonstration. It serves as a place holder indicating where the text will be in the final iteration.",
    },
    {
      type: "paragraph",
      content:
        "Originally from Latin, Lorem ipsum has no intelligible meaning. It is simply a display of letters to be viewed as a sample with given graphical elements in a file.",
    },
    {
      type: "paragraph",
      content:
        "“Lipsum” (a portmanteau of lorem and ipsum) generators are commonly used to form generic text in a file. The words are adequately like normal text to demonstrate a font, without distracting the reader with its content.",
    },
    {
      type: "paragraph",
      content:
        "It has been used by printers as placeholder text since the 16th century.",
    },
    {
      type: "paragraph",
      content:
        "Richard McClintock discovered the origins of the words Lorem Ipsum back in 1982, who published his findings in 1994 in a letter to the editor of Before & After magazine who wrongly claimed that the passage had no meaning.",
    },
    {
      type: "paragraph",
      content:
        "In fact, it originates from a treatise on the theory of ethics written by Cicero in 45 BC: “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil).",
    },
    {
      type: "paragraph",
      content: "The passage that is usually used is the one below:",
    },
    {
      type: "quote",
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”",
    },
    {
      type: "paragraph",
      content:
        "However, although it looks like Latin, the original words from Cicero have been scrambled and interjected with meaningless filler text for reasons that defy history.",
    },
    {
      type: "paragraph",
      content:
        "According to McClintock, but it’s just a theory, a part of the original text was scrambled by 15th century typesetter who needed placeholder text to mockup various fonts for a type specimen book.",
    },
    {
      type: "paragraph",
      content:
        "No matter what the true history may be, today Lorem ipsum is widely used since it closely resembles English more than Latin, creating a natural looking block of text that doesn’t distract the reader from the layout.",
    },
    {
      type: "paragraph",
      content:
        "The passage became popularized in the 1960s when Letraset used it to advertise their dry-transfer sheets. It reached the digital world between the 1980s and 1990s when Aldus bundled the text in the word-processing templates of their desktop publishing software PageMaker.",
    },
    {
      type: "paragraph",
      content:
        "Later on, it was widely adopted by other word processors, such as Microsoft Word; and by content management system tools, such as WordPress for stock websites, page templates, and themes.",
    },
    {
      type: "paragraph",
      content:
        "Today, a large number of variations of Lorem ipsum actually exist.",
    },
    {
      type: "paragraph",
      content:
        "On the Internet, there are many generators that repeat predefined chunks and combine them with model sentences to create believable structures.",
    },
    {
      type: "paragraph",
      content:
        "Some of them inject the random text with random Latin words, humor or even profanities.",
    },
    {
      type: "paragraph",
      content:
        "In fact, it can be argued that Lorem Ipsum generators are the first true generator that ever hit the Internet.",
    },
  ]);
