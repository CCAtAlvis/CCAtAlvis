import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getCurrentPalette } from '../../config/theme';

const AnimatedBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const [blobCount, setBlobCount] = useState(0);
  const [blobConfigs, setBlobConfigs] = useState([]);
  const [blobStates, setBlobStates] = useState([]); // [{x, y, rotate}]
  const palette = getCurrentPalette();
  const intervalsRef = useRef([]);

  // Helper to get random position (allowing out of screen)
  const getRandomPosition = () => ({
    x: `${-20 + Math.random() * 140}%`, // -20% to 120%
    y: `${-20 + Math.random() * 140}%`,
    rotate: Math.random() * 360,
  });

  // Initialize with random blob count and configurations
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Random number of blobs between 3-6
    const count = 3 + Math.floor(Math.random() * 4);
    setBlobCount(count);

    // Generate random configurations for each blob
    const configs = Array.from({ length: count }, (_, i) => ({
      id: `blob-${i}`,
      // size: 0.5 + Math.random() * 0.8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      // duration: 10 + Math.random() * 10,
      duration: 15,
      initialPath: getRandomPath(),
      paths: [getRandomPath(), getRandomPath(), getRandomPath(), getRandomPath()],
    }));

    setBlobConfigs(configs);
    setBlobStates(configs.map(() => getRandomPosition()));
  }, [prefersReducedMotion]);

  // Set up intervals to update each blob's position/rotation
  useEffect(() => {
    // Clear previous intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    if (blobConfigs.length === 0) return;

    const newIntervals = blobConfigs.map((config, i) => {
      return setInterval(() => {
        setBlobStates(prev => {
          const updated = [...prev];
          updated[i] = getRandomPosition();
          return updated;
        });
      }, (config.duration) * 1000);
    });
    intervalsRef.current = newIntervals;
    return () => {
      newIntervals.forEach(clearInterval);
    };
  }, [blobConfigs]);

  const blobPaths = [
    // `M421.9,264.5c-34.2,40.5-80.1,72.4-132.6,86.5c-59.1,16.1-123.7,10.2-178.1-16.2C56.2,307.6,14.2,259.1,3.3,201.4c-12.1-63.9,6.4-130.5,52.1-176.1C100.9-20.2,172.4-36.9,236.2-26.4c58.5,9.6,111.2,41.9,149.2,87.4C423.4,116.7,456.1,224,421.9,264.5z`,
    // `M415.4,200.3c-28.2,38.4-76.1,58.5-123.7,72.4c-53.5,15.6-110.8,18.2-164.5,2.3C73.4,259.1,25.2,216.4,6.3,161.7C-13.9,102.1,9.7,38.3,51.8,1.3C94.3-36.2,156.3-41.9,213.2-28c52.4,12.8,100.2,43.9,138.1,84.2C389.2,96.5,443.6,161.9,415.4,200.3z`,
    // `M389.1,231.5c-25.6,42.7-68.9,71.2-116.5,84.1c-53.5,14.6-111.2,11.2-163.8-9.6C56.2,285.2,15.2,239.1,2.1,184.4C-11.9,126.1,12.8,65.2,53.7,25.6C94.6-14,154.3-26.1,208.4-14.8c50.1,10.4,95.2,38.1,131.5,77.4C376.2,102.2,414.7,188.8,389.1,231.5z`,

    "M30.4,-47.3C40.7,-40.7,51.2,-34.4,55.4,-25.3C59.5,-16.1,57.3,-4.1,58.3,10.4C59.3,24.9,63.5,41.8,58.7,55.3C53.9,68.8,40,79,24.3,84.4C8.5,89.9,-9.2,90.7,-24.8,85.6C-40.3,80.4,-53.7,69.3,-61,55.7C-68.3,42.2,-69.5,26.2,-69.4,11.4C-69.3,-3.3,-67.8,-16.8,-63.3,-29.9C-58.8,-42.9,-51.3,-55.5,-40.2,-61.7C-29.2,-68,-14.6,-67.9,-2.3,-64.4C10.1,-60.9,20.1,-53.9,30.4,-47.3Z",
    "M42.7,-71C50.6,-61.5,48.8,-41.5,56.1,-25.6C63.4,-9.7,79.7,2,80.3,13C81,23.9,66,34.1,52.7,40.9C39.4,47.7,27.7,51.1,16.6,52.8C5.4,54.4,-5.2,54.2,-15,51.2C-24.7,48.3,-33.6,42.5,-44.1,35.4C-54.7,28.3,-66.9,19.8,-73.6,7.4C-80.3,-5,-81.6,-21.4,-73.5,-31.3C-65.4,-41.1,-48.1,-44.4,-34.3,-51.3C-20.4,-58.1,-10.2,-68.6,3.6,-74.2C17.4,-79.8,34.9,-80.6,42.7,-71Z",
    "M42,-68.9C50.5,-60,50.6,-41.6,54.4,-26.8C58.2,-12,65.6,-0.7,65.2,10.1C64.8,20.9,56.5,31.4,48.5,43.9C40.6,56.5,32.9,71.1,20.6,78.5C8.4,85.9,-8.5,86,-24.2,81.7C-40,77.4,-54.7,68.8,-62.3,56.1C-69.9,43.5,-70.4,26.8,-71.5,11C-72.7,-4.8,-74.4,-19.8,-68.8,-31.2C-63.2,-42.5,-50.2,-50.2,-37.5,-57.2C-24.8,-64.2,-12.4,-70.5,2.2,-73.9C16.8,-77.3,33.6,-77.9,42,-68.9Z",
    "M26.6,-42.3C39.1,-33.4,56.9,-33.8,60.6,-27.2C64.4,-20.6,54.1,-7.2,48.4,4.4C42.8,16,41.7,25.6,37.2,33.9C32.6,42.3,24.6,49.3,14.9,53.3C5.2,57.3,-6.1,58.4,-19.8,58.4C-33.5,58.5,-49.5,57.6,-52.9,48.6C-56.3,39.6,-47,22.5,-46.4,8.4C-45.7,-5.8,-53.7,-16.9,-55.5,-30.5C-57.3,-44,-53,-59.8,-42.7,-69.7C-32.4,-79.5,-16.2,-83.3,-4.6,-76.2C7.1,-69.1,14.2,-51.1,26.6,-42.3Z",
  ];

  const getRandomPath = () => {
    return blobPaths[Math.floor(Math.random() * blobPaths.length)];
  };

  if (prefersReducedMotion || blobCount === 0) {
    return (
      <section className="absolute h-full w-full flex flex-col justify-center bg-gradient-to-br from-primary-200 via-light to-secondary-200">
      </section>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="relative w-full h-full">
        {blobConfigs.map((config, i) => (
          <motion.div
            key={config.id}
            className="absolute"
            style={{
              width: '50vmax',
              height: '50vmax',
              x: `${config.x}%`,
              y: `${config.y}%`,
              filter: 'blur(40px)',
              mixBlendMode: 'screen',
            }}
            animate={{
              x: blobStates[i]?.x || '0%',
              y: blobStates[i]?.y || '0%',
              rotate: blobStates[i]?.rotate || 0,
            }}
            transition={{
              duration: config.duration,
              ease: 'easeInOut',
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <motion.radialGradient
                  id={`gradient-${config.id}`}
                  gradientUnits="objectBoundingBox"
                  cx="0.5"
                  cy="0.5"
                  r="0.5"
                  animate={{
                    cx: ['40%', '60%', '40%'],
                    cy: ['40%', '60%', '40%'],
                  }}
                  transition={{
                    duration: config.duration * 0.7,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <stop offset="0%" stopColor={palette.primary[200]} />
                  <stop offset="50%" stopColor={palette.secondary[300]} />
                  <stop offset="100%" stopColor={palette.primary[400]} />
                </motion.radialGradient>
              </defs>

              <motion.path
                d={config.initialPath}
                fill={`url(#gradient-${config.id})`}
                transform="translate(100,100)"
                animate={{
                  d: config.paths,
                }}
                transition={{
                  duration: config.duration * 0.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;