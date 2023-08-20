import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";


export const summarizeFile = async (file, numberOfParagraph) => {
    // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
    const text = fs.readFileSync(file, "utf8");
    const model = new OpenAI({ temperature: 0 });
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([text]);

    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = loadSummarizationChain(model, {
        type: "map_reduce",
        combinePrompt: `Summarize the input documents into ${numberOfParagraph} paragraphs`
    });

    const res = await chain.call({
        input_documents: docs,
    });
    
    console.log({ res });

    return res
    /*
    {
      res: {
        text: ' President Biden is taking action to protect Americans from the COVID-19 pandemic and Russian aggression, providing economic relief, investing in infrastructure, creating jobs, and fighting inflation.
        He is also proposing measures to reduce the cost of prescription drugs, protect voting rights, and reform the immigration system. The speaker is advocating for increased economic security, police reform, and the Equality Act, as well as providing support for veterans and military families.
        The US is making progress in the fight against COVID-19, and the speaker is encouraging Americans to come together and work towards a brighter future.'
      }
    }
    */
}
