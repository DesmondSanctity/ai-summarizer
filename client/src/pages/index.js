import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';



export default function Home() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
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

      {/* Page Body */}
      <div className="flex flex-1 p-4">

        {/* Text Area */}
        <div className="flex-1 pr-4">
          <Editor
            apiKey="skb5gw2zo2dgmtijsoi6e1pkjhainaet1bdsmml1iom4y2t1"
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="This is the initial content of the editor."
            init={{
              height: 700,
              width: 1000,
              menubar: false,
              plugins: [
                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <button onClick={log} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Summarize</button>
        </div>

        {/* Side Section */}
        <div className="flex-1 border border-gray-500 rounded p-4" style={{ height: '80vh' }}>
          <p>Summarized content here...</p>
        </div>

      </div>

    </div>
  )
}
