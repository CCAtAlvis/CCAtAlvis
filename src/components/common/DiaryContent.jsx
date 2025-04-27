import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const DiaryContent = ({ content }) => {
  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="my-6">
            <p className="text-gray-700 leading-relaxed">
              {block.content}
            </p>
          </div>
        )

      case 'image':
        return (
          <div key={index} className="my-8">
            <img
              src={block.url}
              alt={block.caption || 'Image'}
              className="w-full rounded-lg shadow-md"
            />
            {block.caption && (
              <p className="text-sm text-center text-gray-500 mt-2">{block.caption}</p>
            )}
          </div>
        )

      case 'code':
        return (
          <div key={index} className="my-8">
            <div className="rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language={block.language || 'javascript'}
                style={atomOneDark}
                showLineNumbers={true}
                wrapLongLines={true}
                customStyle={{ borderRadius: '0.5rem', padding: '1.5rem' }}
              >
                {block.content.trim()}
              </SyntaxHighlighter>
            </div>
          </div>
        )

      case 'github':
        return (
          <div key={index} className="my-6">
            <a
              href={`https://github.com/${block.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center">
                <svg className="h-6 w-6 text-gray-700 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">{block.repo}</p>
                  <p className="text-sm text-gray-500">
                    {block.type === 'repository' ? 'GitHub Repository' :
                      block.type === 'pull-request' ? 'Pull Request' : 'Issue'}
                  </p>
                </div>
              </div>
            </a>
          </div>
        )

      case 'map':
        return (
          <div key={index} className="my-8">
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Map: {block.location}</p>
                <p className="text-sm text-gray-500">
                  (Interactive map would be embedded here)
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="diary-content">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

export default DiaryContent