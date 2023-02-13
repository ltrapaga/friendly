module.exports = {
  capitalize_first_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  capatilize_last_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  format_time: (time) => {
    return new Date(time).toLocaleString('en-US', {
      hour12: true,
      hourCycle: 'h12',
      hour: 'numeric',
      minute: '2-digit'
    });
  },
  acquireChat: (sendUserId, atmID) => {
    if (sendUserId !== atmID) {
      return 'received';
    }
    return 'sent';
  },
};
