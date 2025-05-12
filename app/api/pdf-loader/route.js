import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


// const pdfURL='https://groovy-platypus-381.convex.cloud/api/storage/b5b184a3-8897-4ee8-b23c-7c848e38ddb2';
export async function GET (req){
    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfURL = searchParams.get('pdfUrl');
    console.log(pdfURL);    
    //1. Load the PDF from the URL
    const response = await fetch(pdfURL);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc => {
        pdfTextContent += doc.pageContent;
    });

    //2. split message into small chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunksize:100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);
    let splitterList = [];
    output.forEach(doc => {
        splitterList.push(doc.pageContent);
    });
    
    return NextResponse.json({result: splitterList});
}
