export const diaryEntries = [
  {
    id: 1,
    title: "Exploring Tokyo",
    date: "October 12, 2023",
    category: "Travel",
    type: "personal",
    content: [
      {
        type: "text",
        content: "Spent the day exploring the vibrant streets of Tokyo. Started in Shibuya and made my way through Harajuku, then ended the day with amazing sushi in Ginza."
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
        caption: "Shibuya Crossing at twilight"
      },
      {
        type: "text",
        content: "The city never sleeps - even at midnight, the streets were bustling with energy. Can't wait to explore more tomorrow!"
      }
    ],
    tags: ["travel", "japan", "food", "photography"]
  },
  {
    id: 2,
    title: "Building a Blockchain Explorer",
    date: "September 28, 2023",
    category: "Development",
    type: "technical",
    content: [
      {
        type: "text",
        content: "Started working on a lightweight blockchain explorer for EVM-compatible chains. The goal is to make it fast and user-friendly, while still providing all the necessary functionality."
      },
      {
        type: "code",
        language: "javascript",
        content: `
// Example code for fetching blockchain data
async function getBlockData(blockNumber) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const block = await provider.getBlock(blockNumber);
  const transactions = await Promise.all(
    block.transactions.map(txHash => provider.getTransaction(txHash))
  );
  return { block, transactions };
}
        `
      },
      {
        type: "text",
        content: "The most challenging part so far has been optimizing the transaction list rendering for blocks with hundreds of transactions. I'm using virtualization to handle this efficiently."
      }
    ],
    tags: ["blockchain", "development", "ethereum", "web3"]
  },
  {
    id: 3,
    title: "Swiss Alps Hiking Adventure",
    date: "October 23, 2023",
    category: "Travel",
    type: "personal",
    content: [
      {
        type: "text",
        content: "Hiked through the breathtaking Swiss Alps today. The views were absolutely spectacular, with snow-capped peaks and lush green valleys stretching as far as the eye could see."
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
        caption: "The majestic Swiss Alps"
      },
      {
        type: "map",
        location: "Swiss Alps, Switzerland",
        zoom: 12
      },
      {
        type: "text",
        content: "The trail was challenging but rewarding. We climbed for about 4 hours to reach the summit, where we had a picnic lunch with panoramic views of the surrounding mountains."
      }
    ],
    tags: ["travel", "hiking", "switzerland", "nature"]
  },
  {
    id: 4,
    title: "Implementing DeFi Portfolio Analytics",
    date: "October 5, 2023",
    category: "Development",
    type: "technical",
    content: [
      {
        type: "text",
        content: "Today I worked on adding portfolio analytics to my DeFi dashboard project. The goal is to provide users with insights into their DeFi positions across multiple protocols."
      },
      {
        type: "code",
        language: "typescript",
        content: `
interface PositionMetrics {
  principal: number;
  currentValue: number;
  profit: number;
  apy: number;
  riskScore: number;
}

function calculatePositionMetrics(
  position: Position, 
  historicalData: PriceData[]
): PositionMetrics {
  // Calculate current value
  const currentValue = position.tokens.reduce((total, token) => {
    return total + token.amount * token.currentPrice;
  }, 0);
  
  // Calculate profit/loss
  const profit = currentValue - position.principal;
  
  // Calculate APY
  const daysHeld = getDaysBetween(position.entryDate, new Date());
  const apy = annualize(profit / position.principal, daysHeld);
  
  // Calculate risk score based on volatility and protocol factors
  const riskScore = calculateRiskScore(position, historicalData);
  
  return {
    principal: position.principal,
    currentValue,
    profit,
    apy,
    riskScore
  };
}
        `
      },
      {
        type: "github",
        repo: "username/defi-dashboard",
        type: "repository"
      },
      {
        type: "text",
        content: "Next steps include adding historical performance charts and impermanent loss calculations for liquidity positions."
      }
    ],
    tags: ["defi", "development", "web3", "typescript"]
  }
];

export const getTags = () => {
  const tags = new Set();
  diaryEntries.forEach(entry => {
    entry.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

export const getCategories = () => {
  const categories = new Set();
  diaryEntries.forEach(entry => {
    categories.add(entry.category);
  });
  return Array.from(categories);
};

export const filterEntries = ({ search, tags, categories, type }) => {
  return diaryEntries.filter(entry => {
    // Filter by search term
    if (search && !entry.title.toLowerCase().includes(search.toLowerCase()) &&
      !entry.content.some(block =>
        block.type === 'text' && block.content.toLowerCase().includes(search.toLowerCase())
      )) {
      return false;
    }

    // Filter by tags
    if (tags && tags.length > 0 && !tags.some(tag => entry.tags.includes(tag))) {
      return false;
    }

    // Filter by categories
    if (categories && categories.length > 0 && !categories.includes(entry.category)) {
      return false;
    }

    // Filter by type
    if (type && entry.type !== type) {
      return false;
    }

    return true;
  });
};