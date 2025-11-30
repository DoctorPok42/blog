export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', '127.0.0.1'),
        port: env.int('SMTP_PORT', 1025),
        secure: false,
        ignoreTLS: true,
        auth: undefined,
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'no-reply@example.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'no-reply@example.com'),
      },
    },
  },

  meilisearch: {
    config: {
      host: env("MEILISEARCH_HOST", "http://localhost:7700"),
      apiKey: env("MEILISEARCH_API_KEY"),
      posts: {},
    },
  },
});
