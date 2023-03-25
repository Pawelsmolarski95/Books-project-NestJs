export default () => ({
    port: 3000,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '12h',
    },
  });