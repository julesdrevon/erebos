"use client";

import React from 'react';

interface ResultProps {
  status: 'success' | 'failure';
  date: string;
  minutes: number;
  seconds: number;
  className?: string;
}

const Result: React.FC<ResultProps> = ({
                                         status,
                                         date,
                                         minutes,
                                         seconds,
                                         className = ''
                                       }) => {
  const statusConfig = {
    success: {
      color: 'text-green-500',
      dotColor: 'text-green-500',
      text: 'Réussi'
    },
    failure: {
      color: 'text-red-500',
      dotColor: 'text-red-500',
      text: 'Échoué'
    }
  };

  const { color, dotColor, text } = statusConfig[status];

  return (
    <div className={`bg-gray-900 px-4 py-2 rounded flex justify-between items-center border-2 border-gray-700 ${className}`}>
      <div>
        <div className={`flex items-center ${color}`}>
          <span className={`mr-2 text-xl ${dotColor}`}>●</span>
          <p>{text}</p>
        </div>
        <div className="text-xs text-gray-400">
          {text} le {date}
        </div>
      </div>
      <div className="text-xs text-gray-400">{minutes}m {seconds}s</div>
    </div>
  );
};

export default Result;