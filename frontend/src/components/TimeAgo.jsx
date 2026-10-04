import { useState, useEffect, useRef } from 'react';

const TimeAgo = ({ createdAt, className = '' }) => {
  const [timeString, setTimeString] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setTimeString(formatTimeAgo(createdAt));
    //   console.log("hello")
    };

    // Initial update
    updateTime();
    
    // Calculate how old the post is
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const diffMinutes = diffMs / (1000 * 60);
    
    // Set update frequency based on post age
    let updateInterval;
    
    if (diffMinutes < 60) {
      // Less than 1 hour old - update every minute
      updateInterval = 60000; // 1 minute
    } else if (diffMinutes < 1440) {
      // Less than 24 hours old - update every 5 minutes
      updateInterval = 300000; // 5 minutes
    } else if (diffMinutes < 10080) {
      // Less than 7 days old - update every 30 minutes
      updateInterval = 1800000; // 30 minutes
    } else {
      // Older than 7 days - no need to update (static display)
      updateInterval = null;
    }
    
    // Set interval only if needed
    if (updateInterval) {
      intervalRef.current = setInterval(updateTime, updateInterval);
    }
    
    // Cleanup on unmount or when createdAt changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [createdAt]);

  return <span className={`${className}`}>{timeString}</span>;
};

// Inline formatTimeAgo function for frontend use
const formatTimeAgo = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  
  if (diffInSeconds < 0 || isNaN(diffInSeconds)) {
    return 'Just now';
  }
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  const currentYear = now.getFullYear();
  const postYear = postDate.getFullYear();
  
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  const timeString = postDate.toLocaleTimeString('en-US', timeOptions);
  
  if (diffInSeconds < 2592000) {
    const dateOptions = { 
      month: 'short', 
      day: 'numeric'
    };
    const dateString = postDate.toLocaleDateString('en-US', dateOptions);
    return `${dateString} at ${timeString}`;
  }
  
  if (postYear === currentYear) {
    const dateOptions = { 
      month: 'short', 
      day: 'numeric'
    };
    const dateString = postDate.toLocaleDateString('en-US', dateOptions);
    return `${dateString} at ${timeString}`;
  } else {
    const dateOptions = { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    };
    const dateString = postDate.toLocaleDateString('en-US', dateOptions);
    return `${dateString} at ${timeString}`;
  }
};

export default TimeAgo;