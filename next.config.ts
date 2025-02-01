// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/menu",
        destination: "https://cdn-dev.preoday.com/challenge/menu",
      },
    ];
  },
};
