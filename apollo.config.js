const uri =
  process.env.NODE_ENV === "production"
    ? "https://crave-eat-backend.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";
module.exports = {
  client: {
    includes: ["./src/**/*.{tsx, ts}"],
    tagName: "gql",
    service: {
      name: "crave-eat-frontend",
      url: `${uri}`,
    },
  },
};
