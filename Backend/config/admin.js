module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '26b4512922f511d2b9ef5aba5226c331'),
  },
});
