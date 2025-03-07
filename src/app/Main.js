"use client"

import React, { useState, useEffect } from 'react';

function hexdumpToPrintfOrDd(hexdump, device = '/dev/input/event2', useDd = false) {
  // Split the input by lines
  const lines = hexdump.trim().split('\n');
  const commands = [];
  
  for (const line of lines) {
    // Extract only the hex portion, removing address and ASCII representation
    const match = line.match(/\|(.+?)\|/);
    if (!match) continue;
    
    const hexString = line.substring(8, match.index).trim();
    
    // Split the hex string into pairs and format them as \x escapes
    const hexPairs = hexString.split(' ').filter(pair => pair.length === 2);
    if (hexPairs.length === 0) continue;
    
    const escapeSequence = hexPairs.map(pair => `\\x${pair}`).join('');
    
    // Create the command based on user selection
    if (useDd) {
      commands.push(`echo -ne "${escapeSequence}" | dd of=${device} bs=16`);
    } else {
      commands.push(`printf "${escapeSequence}" > ${device}`);
    }
  }
  
  return commands.join('\n');
}

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [device, setDevice] = useState('/dev/input/event2');
  const [useDd, setUseDd] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const convertHexdump = () => {
    setOutput(hexdumpToPrintfOrDd(input, device, useDd));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleDeviceChange = (e) => {
    setDevice(e.target.value);
  };

  const toggleCommandType = () => {
    setUseDd(!useDd);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  // Convert when input, device, or command type changes
  useEffect(() => {
    convertHexdump();
  }, [input, device, useDd]);

  return (
      <>
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="w-full sm:flex-1">
          <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Target Device Path
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              id="device"
              value={device}
              onChange={handleDeviceChange}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="/dev/input/event2"
            />
            
            <button
              onClick={toggleCommandType}
              className={`px-3 sm:px-4 py-2 sm:py-3 h-10 sm:h-12 rounded-md text-sm font-medium text-white shadow-sm whitespace-nowrap ${
                useDd ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {useDd ? 'Using: echo | dd' : 'Using: printf'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="col-span-1">
          <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Input (Hexdump Format)</h3>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Paste your hexdump data here..."
            rows="8"
            className="w-full p-2 sm:p-3 text-xs sm:text-sm font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="col-span-1">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <h3 className="text-base sm:text-lg font-medium text-gray-700">
              Output ({useDd ? 'echo | dd' : 'printf'})
            </h3>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium text-white ${
                copySuccess 
                  ? 'bg-green-500' 
                  : output 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              {copySuccess ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Converted commands will appear here..."
            rows="8"
            className="w-full p-2 sm:p-3 text-xs sm:text-sm font-mono border border-gray-300 rounded-md shadow-sm bg-gray-50"
          />
          </div>
          </div>
      </>
  );
}

export default App;