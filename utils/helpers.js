module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
    timeAgo : (dateParam) => {
      if (!dateParam) {
        return null;
      }
    
      const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();

      
    
      if (seconds < 5) {
        return 'now';
      } else if (seconds < 60) {
        return `${ seconds } seconds ago`;
      } else if (seconds < 90) {
        return 'about a minute ago';
      } else if (minutes < 60) {
        return `${ minutes } minutes ago`;
      } else {
        return `${new Date(dateParam).getMonth() + 1}/${new Date(dateParam).getDate()}/${
          new Date(dateParam).getFullYear()
        }`; 
      }
      // } else if (isToday) {
      //   return getFormattedDate(date, 'Today'); // Today at 10:20
      // } else if (isYesterday) {
      //   return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
      // } else if (isThisYear) {
      //   return getFormattedDate(date, false, true); // 10. January at 10:20
      // }
    
      // return getFormattedDate(date); // 10. January 2017. at 10:20
    },
  };
  