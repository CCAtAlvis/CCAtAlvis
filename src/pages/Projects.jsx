import React from 'react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "backgommon",
      description: "Open-source Go library for backtesting and simulating trading strategies. Designed for speed and flexibility, suitable for both single and multi-asset portfolio based testing. Includes advanced features like Monte Carlo simulations and risk analysis.",
      longDescription: "Backgommon is a high-performance Go library designed for financial backtesting. It allows traders and developers to rigorously test trading strategies against historical market data with minimal overhead. The library supports various asset classes and can handle complex portfolio-based strategies.",
      tags: ["Go", "Trading", "Library", "Finance"],
      githubUrl: "#",
      demoUrl: "#",
      image: "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260"
    },
    {
      id: 2,
      title: "Grids-css",
      description: "A minimalist, unopinionated boilerplate for a responsive 12-column grid system. Under 100 lines of code, offering flexible, percentage-based layouts.",
      longDescription: "Grids-css is a lightweight CSS grid system that provides a solid foundation for responsive layouts without imposing design opinions. With less than 100 lines of code, it offers a 12-column grid that works across all screen sizes. The system uses percentage-based widths and simple class naming inspired by Materialize CSS.",
      tags: ["CSS", "Framework", "Web Development"],
      githubUrl: "#",
      demoUrl: "#",
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260"
    },
    {
      id: 3,
      title: "Blockchain Explorer",
      description: "A lightweight explorer for EVM-compatible blockchains with transaction tracking, address monitoring, and smart contract verification.",
      longDescription: "This blockchain explorer provides a user-friendly interface for interacting with EVM-compatible blockchains. Users can track transactions, monitor addresses, and verify smart contracts. The explorer includes features like real-time transaction notifications, gas price predictions, and detailed analytics.",
      tags: ["Web3", "JavaScript", "Ethereum", "Blockchain"],
      githubUrl: "#",
      liveUrl: "#",
      image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260"
    },
    {
      id: 4,
      title: "DeFi Dashboard",
      description: "Unified dashboard for monitoring DeFi positions across multiple chains and protocols with performance analytics.",
      longDescription: "The DeFi Dashboard allows users to track their positions across various DeFi protocols and blockchain networks from a single interface. It provides comprehensive analytics, including historical performance, impermanent loss calculations, and yield projections. The dashboard also offers alert systems for significant price movements or protocol changes.",
      tags: ["React", "Web3", "DeFi", "TypeScript"],
      githubUrl: "#",
      image: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260"
    },
    {
      id: 5,
      title: "NFT Marketplace",
      description: "A platform for creating, buying, and selling NFTs with support for multiple blockchains.",
      longDescription: "This NFT marketplace allows creators and collectors to mint, buy, sell, and auction NFTs across multiple blockchain networks. The platform includes features like royalty payments, collection creation, and social sharing. It's built with a focus on performance and user experience, making NFT interaction accessible to everyone.",
      tags: ["React", "Web3", "NFT", "Solidity"],
      githubUrl: "#",
      liveUrl: "#",
      image: "https://images.pexels.com/photos/8369629/pexels-photo-8369629.jpeg?auto=compress&cs=tinysrgb&w=1260"
    },
    {
      id: 6,
      title: "Crypto Trading Bot",
      description: "Automated cryptocurrency trading bot with support for multiple exchanges and customizable strategies.",
      longDescription: "This trading bot allows users to implement automated trading strategies across multiple cryptocurrency exchanges. It supports various technical indicators, custom strategy creation, and risk management tools. The bot includes a web interface for monitoring performance and adjusting strategies in real-time.",
      tags: ["Python", "Trading", "Cryptocurrency", "AI"],
      githubUrl: "#",
      image: "https://images.pexels.com/photos/6780789/pexels-photo-6780789.jpeg?auto=compress&cs=tinysrgb&w=1260"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Projects</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Explore my various projects spanning blockchain, web development, finance, and more.
            Each project represents a unique challenge and learning opportunity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  <div className="flex space-x-4 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="text-primary-600 hover:text-primary-800 font-medium">
                        GitHub
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="text-primary-600 hover:text-primary-800 font-medium">
                        Demo
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="text-primary-600 hover:text-primary-800 font-medium">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects