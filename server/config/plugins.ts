export default ({ env }) => ({
  'strapi-plugin-oidc': {
    enabled: true,
    config: {
      OIDC_PUBLIC_URL: env('OIDC_PUBLIC_URL', 'http://localhost:1337'),
      OIDC_ISSUER: env('OIDC_ISSUER', 'https://auth.doctorpok.io/r/applications'),
      OIDC_CLIENT_ID: env('OIDC_CLIENT_ID'),
      OIDC_CLIENT_SECRET: env('OIDC_CLIENT_SECRET'),
      OIDC_SCOPE: env('OIDC_SCOPE', 'openid profile email'),
      OIDC_SSO_BUTTON_TEXT: env('OIDC_SSO_BUTTON_TEXT', 'Se connecter avec Oh-My-SSO'),
      OIDC_ENFORCE: env.bool('OIDC_ENFORCE', false),
      OIDC_SKIP_LOGIN_PAGE: env.bool('OIDC_SKIP_LOGIN_PAGE', false),
      OIDC_REQUIRE_EMAIL_VERIFIED: env.bool('OIDC_REQUIRE_EMAIL_VERIFIED', true),
      REMEMBER_ME: env.bool('REMEMBER_ME', false),
    },
  },

  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "127.0.0.1"),
        port: env.int("SMTP_PORT", 1025),
        secure: false,
        ignoreTLS: true,
        auth: undefined,
      },
      settings: {
        defaultFrom: env("EMAIL_DEFAULT_FROM", "no-reply@example.com"),
        defaultReplyTo: env("EMAIL_DEFAULT_REPLY_TO", "no-reply@example.com"),
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

  navigation: {
    enabled: true,
  },
});
