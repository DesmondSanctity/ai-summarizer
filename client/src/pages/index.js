import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';



export default function Home() {
  const editorRef = useRef(null);
  const [view, setView] = useState();
  const [summary, setSummary] = useState(null);
  const [file, setFile] = useState()

  async function handleSummarize() {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({
        text: editorRef.current.getContent(),
        file: file,
        paragraphs: 2
      })
    });

    const data = await response.json();
    setSummary(data.data);
  }

  function handleChange(e) {
    setFile(e.target.files[0])
  }

  function handleReset() {
    setFile();
    setView();
  }


  return (
    <div className="flex flex-col h-screen">

      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-4 bg-gray-800 text-white">
        <a href="#" className="text-xl font-bold">
          SummarizeAI
        </a>
        <ul className="flex space-x-4">
          <li><a href="#">Github</a></li>
          <li><a href="#">Article</a></li>
        </ul>
      </nav>

      {/* Radio Selection */}
      <div className="flex items-center justify-center p-4 bg-gray-200">
        <div className="text-lg font-medium mr-4">Text format:</div>
        <div className="flex items-center">
          <div className="p-2 ml-2 bg-white rounded-lg">
            <input
              type="radio"
              name="view"
              value="upload"
              onChange={() => setView('upload')}
            />
            <label className="ml-2">Upload Document(.doc or .pdf)</label>
          </div>

          <div className="p-2 ml-2 bg-white rounded-lg">
            <input
              type="radio"
              name="view"
              value="editor"
              onChange={() => setView('editor')}
            />
            <label className="ml-2">Paste as Text</label>
          </div>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded ml-4"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Page Body */}
      <div className="flex flex-1 p-4">

        {/* Text Area */}
        {view && view == "editor" && (
          <div className="flex-1 pr-4">
            <Editor
              apiKey="skb5gw2zo2dgmtijsoi6e1pkjhainaet1bdsmml1iom4y2t1"
              onInit={(evt, editor) => editorRef.current = editor}
              init={{
                height: 420,
                width: 700,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <button onClick={handleSummarize} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Summarize</button>
          </div>
        )}

        {/* Upload File Area */}
        {view === "upload" && (
          <div className="flex-1 pr-4">
            <div className="flex items-center justify-center">
              <div className="border border-gray-400 bg-gray p-4 rounded shadow-md max-w-lg w-full">

                <div className="flex flex-col items-center justify-center h-64">
                  <input
                    type="file"
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 w-full mb-4"
                  />

                  {file && (
                    <div className="text-center text-blue-400">
                      <p className="text-lg font-medium">{file.name}</p>
                      <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>

                <button onClick={handleSummarize} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                  Summarize
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Default Screen Area */}
        {!view && (
          <div className="flex-1 pr-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to SummarizeAI
                </h2>
                <p className="text-gray-500 max-w-md">
                  Please select an input format above to get started
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Side Section */}
        <div className="flex-1 border border-gray-400 rounded p-4" style={{ height: '70vh' }}>
          {summary &&
            <p> {summary} </p>
          }

          {!summary &&
            <p> Summarized content here ... </p>
          }
        </div>

      </div>

    </div >
  )
}
