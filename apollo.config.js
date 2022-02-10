module.exports = {
  client: {
    includes: ["./src/**/*.{tsx, ts}"],
    tagName: "gql",
    service: {
      name: "crave-eat-frontend",
      url: "http://localhost:4000/graphql",
    },
  },
};
