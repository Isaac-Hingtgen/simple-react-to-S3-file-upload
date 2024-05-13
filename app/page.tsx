'use client'

import Image from "next/image";
import { useState } from "react";
import { sendTextAndFile } from "./S3";


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setText(e.target.value);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (!file || !text) throw Error("Text and file input fields required")
      console.log("Sending: " + file.name)

      const res = await sendTextAndFile(file);
      alert("file and text submitted")
    } catch (e: unknown) {
      if (e instanceof Error)
        alert(e.message)
      else
        alert(String(e))
      return
    }
  }


  return (
    <div className="flex h-screen bg-black items-center justify-center text-white font-serif">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text input: 
            <input id="text" type="text" onChange={handleTextChange}/>
          </label>
        </div>
        <div>
          <label>
            File input: 
            <input id="file" type="file" onChange={handleFileChange}/>
          </label>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}
