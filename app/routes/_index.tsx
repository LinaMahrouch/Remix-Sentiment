import { useState } from 'react';
import { useFetcher } from '@remix-run/react';

export default function Index() {
  const fetcher = useFetcher();
  const [text, setText] = useState('');
  const isLoading = fetcher.state === 'loading';


  const analyzeText = () => {
    if (text.trim() !== '') {
    fetcher.load(`/api/classify?text=${encodeURIComponent(text)}`);
  }
  };
  return (
    <div className=" text-white">
      <div className="py-10 md:py-15 text-center mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center mb-2">
          <h1 className="text-2xl md:text-4xl font-bold"> Welcome to Remix </h1>
          <img src="/images/cd.png" alt="Remix Logo" className="h-8 md:h-12 mx-2 my-2" />
          <h1 className="text-2xl md:text-4xl font-bold">+ Hugging Face</h1>
          <img src="/images/hf-logo.png" alt="Hugging Face Logo" className="h-8 md:h-12 mx-2 my-2" />
        </div>
        <h2 className="text-xl md:text-3xl font-bold">Transformers.js Template</h2>
      </div>

      <div className="container mx-auto  p-4">
        <div className="max-w-lg mx-auto bg-zinc-800 p-6 rounded-lg shadow-md">
          <label htmlFor="textInput" className="block mb-2 text-sm font-medium text-gray-300">Enter text to classify</label>
          <input
            id="textInput"
            type="text"
            className="w-full border-gray-600 focus:border-indigo-800 focus:ring focus:ring-indigo-800 rounded-md px-4 py-2 mb-4 bg-zinc-900 text-gray-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here"
          />
          <button
            onClick={analyzeText}
            disabled={isLoading}
            className={"w-full bg-indigo-800 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"}
          >
            {isLoading ? 'Classifying...' : 'Classify'}
          </button>
          <div aria-live="polite" className="mt-4">
            {fetcher.data ? (
              <pre className="bg-zinc-900 p-4 rounded overflow-x-auto whitespace-pre-wrap">{JSON.stringify(fetcher.data, null, 2)}</pre>
              ) : fetcher.error ? (
                <p className="text-red-500">Error: {fetcher.error.message}</p>
              ) : (
                <p className="text-gray-400">Enter text to analyze</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
