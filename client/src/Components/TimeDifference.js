import React from 'react';
import moment from 'moment-timezone';

function TimeDifference({ savedTime }) {
  const currentTime = new Date();
  const diffInMillis = currentTime - new Date(savedTime);

  const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInMillis >= 86400000) {
    // More than a day
    const daysDiff = moment.duration(diffInMillis).days();
    return <span>{relativeTimeFormat.format(-daysDiff, 'day')}</span>;
  } else if (diffInMillis >= 3600000) {
    // More than an hour
    const hoursDiff = moment.duration(diffInMillis).hours();
    return <span>{relativeTimeFormat.format(-hoursDiff, 'hour')}</span>;
  } else if (diffInMillis >= 60000) {
    // More than a minute
    const minutesDiff = moment.duration(diffInMillis).minutes();
    return <span>{relativeTimeFormat.format(-minutesDiff, 'minute')}</span>;
  } else {
    // Less than a minute
    return <span>Just now</span>;
  }
}

export default TimeDifference;
