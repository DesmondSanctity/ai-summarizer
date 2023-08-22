export default async function handler(req, res) {
    try {
        const { file, text, numParagraphs } = req.body;

        const response = await fetch(`http://localhost:8000/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                file,
                text,
                numParagraphs
            })
        });

        const data = await response.json();

        res.status(200).json({
            status: 'success',
            message: 'Summarization done successfully',
            data: data.summary
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Summarization failed',
            error: error
        });
    }

}