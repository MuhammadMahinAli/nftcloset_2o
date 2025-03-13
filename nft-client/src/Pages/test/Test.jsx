import React, { useRef, useState } from 'react';
import { AiOutlineExpandAlt, AiOutlineFilePdf } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCheckSquare, FiEdit3 } from 'react-icons/fi';
import { GoClock } from 'react-icons/go';
import { GrAttachment } from 'react-icons/gr';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

const Test = () => {
  // Example state holding your checklist items
   // State for checklist items
   const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "lorem ipsum", checked: false },
    { id: 2, text: "lorem-ipsum", checked: true },
  ]);

  // Handler to add a new checklist item *at the top*
  const handleAddNewItem = () => {
    const newItem = {
      id: Date.now(),
      text: "",
      checked: false,
    };
    // Prepend new item to the top
    setChecklistItems((prev) => [newItem, ...prev]);
  };

  // Toggle completed state
  const handleToggle = (itemId) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

    // Remove an item by its ID
    const handleRemoveItem = (id) => {
      setChecklistItems((prev) => prev.filter((item) => item.id !== id));
    };

  // Count completed items for progress bar
  const completedCount = checklistItems.filter((item) => item.checked).length;
  const totalItems = checklistItems.length;
  const progressPercent =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    //-----------------------------------text edit



  // const editorRef = useRef(null);
  // const [content, setContent] = useState(""); // Will store HTML content

  // // Apply formatting to the selected text inside the editor
  // const applyFormat = (format) => {
  //   if (!editorRef.current) return;
  //   editorRef.current.focus();
  
  //   const selection = window.getSelection();
  //   if (!selection.rangeCount) return;
  //   const range = selection.getRangeAt(0);
  //   const selectedText = range.toString();
  //   if (!selectedText) return;
  
  //   let html = "";
  //   if (format === "h1") {
  //     html = `<span style="font-size:24px;">${selectedText}</span>`;
  //   } else if (format === "h2") {
  //     html = `<span style="font-size:20px;">${selectedText}</span>`;
  //   } else if (format === "h3") {
  //     html = `<span style="font-size:16px;">${selectedText}</span>`;
  //   } else if (format === "b") {
  //     html = `<strong>${selectedText}</strong>`;
  //   } else if (format === "i") {
  //     html = `<em>${selectedText}</em>`;
  //   } else if (format === "u") {
  //     html = `<u>${selectedText}</u>`;
  //   } else if (format === "link") {
  //     const url = prompt("Enter a URL:");
  //     if (!url) return;
  //     html = `<a href="${url}" target="_blank">${selectedText}</a>`;
  //   } else {
  //     return;
  //   }
  
  //   // Replace the selected text with our formatted HTML.
  //   document.execCommand("insertHTML", false, html);
  //   // Update state with the new HTML content
  //   setContent(editorRef.current.innerHTML);
  // };
  
  

  // // Whenever the user types or pastes, update content
  // const handleInput = () => {
  //   if (editorRef.current) {
  //     setContent(editorRef.current.innerHTML);
  //   }
  // };


  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const applyFormat = (format) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    // Ensure styles apply as inline CSS (preserving multiple styles)
    document.execCommand("styleWithCSS", false, true);

    switch (format) {
      /* ------------------ HEADINGS WITH CUSTOM SIZES ------------------ */
      case "h1":
      case "h2":
      case "h3": {
        // Step 1: Use fontSize=7 to get largest built-in size
        document.execCommand("fontSize", false, "7");

        // Step 2: Decide custom px size
        let size = 16;
        if (format === "h1") size = 24;
        if (format === "h2") size = 20;
        if (format === "h3") size = 16; // default anyway

        // Step 3: Replace <font size="7"> with <span style="font-size:XXpx">
        const editorEl = editorRef.current;
        const fonts = editorEl.querySelectorAll('font[size="7"]');
        fonts.forEach((fontEl) => {
          const span = document.createElement("span");
          span.style.fontSize = `${size}px`;
          // Move all child nodes from <font> to <span>
          while (fontEl.firstChild) {
            span.appendChild(fontEl.firstChild);
          }
          fontEl.replaceWith(span);
        });
        break;
      }

      /* ------------------ BASIC STYLES ------------------ */
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underline":
        document.execCommand("underline", false, null);
        break;
      case "strike":
        document.execCommand("strikeThrough", false, null);
        break;

      /* ------------------ LINKS ------------------ */
      case "link": {
        const url = prompt("Enter a URL:");
        if (url) {
          document.execCommand("createLink", false, url);
        }
        break;
      }

      /* ------------------ LISTS ------------------ */
      case "ul":
        document.execCommand("insertUnorderedList", false, null);
        break;
      case "ol":
        document.execCommand("insertOrderedList", false, null);
        break;

      /* ------------------ ALIGNMENT ------------------ */
      case "alignLeft":
        document.execCommand("justifyLeft", false, null);
        break;
      case "alignCenter":
        document.execCommand("justifyCenter", false, null);
        break;
      case "alignRight":
        document.execCommand("justifyRight", false, null);
        break;

      /* ------------------ CHECKBOX ------------------ */
      case "checkbox": {
        // Insert a single checkbox at cursor
        // or replace selected text with a "label + checkbox"
        const selection = window.getSelection();
        if (!selection.rangeCount) break;
        const selectedText = selection.toString();
        let html = `<input type="checkbox" />`;
        if (selectedText) {
          html = `<label style="margin-right:4px;"><input type="checkbox" /> ${selectedText}</label>`;
        }
        document.execCommand("insertHTML", false, html);
        break;
      }

      /* ------------------ IMAGE ------------------ */
      case "image": {
        const imageUrl = prompt("Enter the image URL:");
        if (imageUrl) {
          document.execCommand("insertImage", false, imageUrl);
        }
        break;
      }

      /* ------------------ REMOVE FORMAT ------------------ */
      case "removeFormat":
        // Removes all formatting (bold, italic, spans, fonts, etc.) from selection
        document.execCommand("removeFormat", false, null);
        break;

      default:
        break;
    }

    // Update content state after applying
    setContent(editorRef.current.innerHTML);
  };
  return (
    <>
    <div className="w-full max-w-xl mx-auto p-4 space-y-4 bg-blue-50 min-h-screen">
    {/* Header / Date Navigation */}
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-0 border rounded-md">
        <button
          type="button"
          className="rounded-l-md border-r px-2 py-1 bg-white hover:bg-gray-100"
        >
      <IoIosArrowBack/>
        </button>
      
        <button
          type="button"
          className="border-r px-2 py-1 bg-white hover:bg-gray-100"
        >
      <IoCalendarOutline />
        </button>
     
       
        <button
          type="button"
          className="rounded-r-md px-2 py-1 bg-white hover:bg-gray-100"
        >
        <IoIosArrowForward />
        </button>
      </div>
      <div className="text-gray-700 font-medium">
        Wednesday, 29 January
      </div>
      <button
        type="button"
        className="text-blue-600 hover:underline"
      >
        Return To Today
      </button>
    </div>

    {/* Input for new to-do */}
    <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-2">
      <span role="img" aria-label="pencil" className="text-gray-500">
      <FiEdit3 />
      </span>
      <input
        type="text"
        placeholder="Write The Title Of Your To-Do"
        className="flex-grow px-2 py-1 focus:outline-none"
      />
      <button
        type="button"
        className="bg-blue-500 text-white rounded px-3 py-1 text-xl hover:bg-blue-600"
      >
        +
      </button>
    </div>

    {/* Existing to-do item */}
    <div className="bg-white rounded-lg shadow p-4">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button type="button" className="text-gray-500">
            {/* Arrow icon for collapsing or expanding details */}
            <IoIosArrowForward />
          </button>
          <span className="font-medium text-gray-800">Title</span>
        </div>
        {/* Status dropdown or label */}
        <div className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded flex items-center space-x-2">
        <p>  To-Do</p>
          <IoIosArrowDown />
        </div>
      </div>

      {/* Days left */}
      <div className="text-gray-500 text-sm mt-2 flex items-center space-x-2">
      <GoClock />
        <span>10 days left</span></div>
    </div>
  </div>
  <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Top bar with placeholders for "Share" and "Expand" */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <div className="flex items-center space-x-5">
          <button className="hover:underline flex items-center space-x-1">
          <PiShareFatLight className='text-xl' />
           <p>Share</p>
           </button>
         
          <button className="hover:underline flex items-center space-x-1">
          <AiOutlineExpandAlt className='text-xl' />
            <p>Expand</p>
            </button>
        </div>
        <button className="focus:outline-none text-gray-400">
          {/* 'X' button placeholder to close */}
          ✕
        </button>
      </div>

      {/* Title Row */}
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 focus:outline-none text-lg">
          {/* Expand/collapse arrow icon placeholder */}
          <IoIosArrowUp />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Title</h1>
      </div>

      {/* Status & Date Row */}
      <div className="flex items-center space-x-2">
        {/* Status dropdown placeholder */}
        <div className="relative">
          <button className="bg-green-100 text-green-700 px-3 py-1 rounded-md focus:outline-none flex items-center space-x-1">
            <span>Working</span>
            {/* Down arrow icon */}
            <IoIosArrowDown />
          </button>
          {/* 
            For a real dropdown, you might have a conditionally rendered <ul> or <div> 
            below this with Tailwind classes like "absolute bg-white ..." 
          */}
        </div>
        {/* Date label */}

        <div className="text-gray-500 text-sm  flex items-center space-x-2">
      <GoClock className='text-xl' />
        <span> July 10–14</span></div>
     
      </div>

      {/* Time Spent Bar */}
      <div className="flex items-center justify-between bg-[linear-gradient(to_right,_#EFF4FA_0%,_#B4D9F6_8%,_#D6B6F9_90%)] rounded-md p-3 text-gray-600">
        <div className="flex items-center space-x-2">
          {/* Play icon placeholder 8.46> 3.12 */}
          <span className="text-xl text-white bg-[#D6B6F9] px-2 rounded-md">▶</span>
          <span>Time Spent On This Project</span>
        </div>
        <div className="text-xl font-bold">12:45:00</div>
      </div>

      {/* Editor Section */}
      <div>
        {/* Editor toolbar (placeholders) */}
        <div className="flex space-x-2 text-gray-500 mb-2">
          <button className="hover:bg-gray-100 px-2 py-1 rounded">H1</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">H2</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">H3</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">B</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">I</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">U</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">🔗</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">{"</>"}</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">●</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded">Card</button>
        </div>
        {/* Actual text area */}
        <textarea
          className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          rows={5}
          placeholder="write text"
        ></textarea>
      </div>

      {/* Buttons Row */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 bg-blue-100 text-blue-700 border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-200">
        <FiCheckSquare className='text-xl'/>
        <p>Create checklist</p>
          
        </button>
        <button className="flex items-center space-x-2 bg-orange-100 text-orange-600  border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-200">
        <GrAttachment className='text-xl' />
        <p>Add Attachment</p>
          
        </button>
      </div>

      {/* Attachments Section */}
      <div className="space-y-2">
        <div className='flex items-center space-x-3'>
        <IoIosArrowDown />
        <h3 className="text-lg font-semibold text-gray-700">Attachments</h3>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
          <div className="flex items-center space-x-2">
            {/* Attachment icon placeholder */}
            <div className='bg-blue-100 rounded-md p-2'>
            <AiOutlineFilePdf className='text-3xl' />
            </div>
   
            <div className="flex flex-col">
              <span className="text-sm text-gray-800">
                lorem ipsum lorem ipsum.pdf
              </span>
              <span className="text-xs text-gray-500">
                22:32 PM, 22 August
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-blue-600 text-sm">
            <button className="hover:underline">View</button>
            <button className="hover:underline">Download</button>
          </div>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">

        <div className='flex items-center space-x-3'>
        <IoIosArrowDown />
        <h3 className="text-lg font-semibold text-gray-700">
            Checklist {completedCount}/{totalItems}
          </h3>
        </div>

          
       
        </div>

        {/* Progress Bar */}
        <div className='flex justify-between items-center'>
        <div className=" bg-blue-100 h-2 rounded relative w-11/12">
          <div
            className="bg-blue-500 h-2 rounded absolute left-0 top-0"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{progressPercent}%</span>
        </div>
        

        {/* Checklist Items */}
        <div className="space-y-4">
      {checklistItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-2 p-3 bg-[#E5E5E5] rounded-xl border"
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleToggle(item.id)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          {item.checked ? (
            <del className="flex-grow text-gray-600">{item.text || "New item..."}</del>
          ) : (
            <input
              type="text"
              placeholder="New item..."
              value={item.text}
              onChange={(e) => {
                const newText = e.target.value;
                setChecklistItems((prev) =>
                  prev.map((curr) =>
                    curr.id === item.id ? { ...curr, text: newText } : curr
                  )
                );
              }}
              className="bg-transparent flex-grow outline-none"
            />
          )}
 
          {/* Remove button */}
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-red-600 hover:text-red-800 ml-auto"
          >
         <FaRegTrashAlt />
          </button>
        </div>
      ))}

      {/* "Add new item" button */}
      <div
        onClick={handleAddNewItem}
        className="flex items-center space-x-2 p-2 bg-[#E5E5E5] rounded-xl border cursor-pointer"
      >
        <p className="border px-2 rounded-md border-gray-400">+</p>
        <p className="flex-grow capitalize">Add new item</p>
      </div>
    </div>
    {/* <div className="space-y-4 p-4 max-w-xl mx-auto">
      
      <div className="flex space-x-2 text-gray-500 mb-2">
        <button onClick={() => applyFormat("h1")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H1
        </button>
        <button onClick={() => applyFormat("h2")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H2
        </button>
        <button onClick={() => applyFormat("h3")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H3
        </button>
        <button onClick={() => applyFormat("b")} className="hover:bg-gray-100 px-2 py-1 rounded">
          B
        </button>
        <button onClick={() => applyFormat("i")} className="hover:bg-gray-100 px-2 py-1 rounded">
          I
        </button>
        <button onClick={() => applyFormat("u")} className="hover:bg-gray-100 px-2 py-1 rounded">
          U
        </button>
        <button onClick={() => applyFormat("link")} className="hover:bg-gray-100 px-2 py-1 rounded">
          🔗
        </button>
      </div>

    
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none min-h-[100px]"
      >
        Write your text here...
      </div>

   
      <div className="p-4 border border-gray-200 rounded">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div> */}

<div className="space-y-4 p-4 max-w-xl mx-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 text-gray-500 mb-2">
        {/* Headings */}
        <button onClick={() => applyFormat("h1")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H1
        </button>
        <button onClick={() => applyFormat("h2")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H2
        </button>
        <button onClick={() => applyFormat("h3")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H3
        </button>

        {/* Bold, Italic, Underline, Strikethrough */}
        <button onClick={() => applyFormat("bold")} className="hover:bg-gray-100 px-2 py-1 rounded">
          B
        </button>
        <button onClick={() => applyFormat("italic")} className="hover:bg-gray-100 px-2 py-1 rounded">
          I
        </button>
        <button onClick={() => applyFormat("underline")} className="hover:bg-gray-100 px-2 py-1 rounded">
          U
        </button>
        <button onClick={() => applyFormat("strike")} className="hover:bg-gray-100 px-2 py-1 rounded">
          S
        </button>

        {/* Link */}
        <button onClick={() => applyFormat("link")} className="hover:bg-gray-100 px-2 py-1 rounded">
          🔗
        </button>

        {/* Lists */}
        <button onClick={() => applyFormat("ul")} className="hover:bg-gray-100 px-2 py-1 rounded">
          UL
        </button>
        <button onClick={() => applyFormat("ol")} className="hover:bg-gray-100 px-2 py-1 rounded">
          OL
        </button>

        {/* Alignment */}
        <button onClick={() => applyFormat("alignLeft")} className="hover:bg-gray-100 px-2 py-1 rounded">
          L
        </button>
        <button onClick={() => applyFormat("alignCenter")} className="hover:bg-gray-100 px-2 py-1 rounded">
          C
        </button>
        <button onClick={() => applyFormat("alignRight")} className="hover:bg-gray-100 px-2 py-1 rounded">
          R
        </button>

        {/* Checkbox & Image */}
        <button onClick={() => applyFormat("checkbox")} className="hover:bg-gray-100 px-2 py-1 rounded">
          ☑
        </button>
        <button onClick={() => applyFormat("image")} className="hover:bg-gray-100 px-2 py-1 rounded">
          🖼
        </button>

        {/* Remove Format */}
        <button
          onClick={() => applyFormat("removeFormat")}
          className="hover:bg-red-100 px-2 py-1 rounded text-red-600"
        >
          Clear
        </button>
      </div>

      {/* Editable Area (WYSIWYG) */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none min-h-[100px]"
      >
        Write your text here...
      </div>

      {/* Preview */}
      <div className="p-4 border border-gray-200 rounded">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div> 
   
      </div>
    </div>
  </>
  );
};

export default Test;