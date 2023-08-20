import { summarizeFile } from "./helpers/summarizeFile.js";
import { summarizeText } from "./helpers/summarizeText.js";


export async function summarize(req, res) {

    try {
        const { file, text, numberOfParagraph } = req.body;

        if (file) {
            // run it through the file upload summarize function
            const response = summarizeFile(file, numberOfParagraph);

            if (response) {
                res.status(200).json({
                    status: "success",
                    message: "file summarized successfully",
                    data: response,
                });

            } else {
                throw new Error("Error summarizing file, Try again!")
            }
        }

        if (text) {
            // run it through the text summarize function
            const response = summarizeText(text, numberOfParagraph)

            if (response) {
                res.status(200).json({
                    status: "success",
                    message: "text summarized successfully",
                    data: response,
                });

            } else {
                throw new Error("Error summarizing text, Try again!")
            }
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "failed to summarize",
            error: error
        });
    }
}