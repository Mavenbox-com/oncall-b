export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        folder: env('CLOUDINARY_FOLDER'),
        format: ['jpeg', 'png', 'webp', 'jpg', 'svg'],
        quality: 80, // Calidad de compresión
        secure: true, // Habilitar HTTPS para las URLs generadas
        transformation: { // Transformaciones de imagen predeterminadas
          crop: 'fill',
          gravity: 'auto',
          quality: 'auto',
        },
        // TODO: Breakpoints para generar versiones de imagen en diferentes tamaños
        sizeLimit: 2 * 1024 * 1024, // 2 MB en bytes
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  // 'apollo-sandbox': {
  //   // enables the plugin only in development mode
  //   // if you also want to use it in production, set this to true
  //   // keep in mind that graphql playground has to be enabled
  //   enabled: env('ENVIROMENT') === 'production' ? false : true,
  //   // endpoint: "https://tunneled-strapi.com/graphql", // OPTIONAL - endpoint has to be accessible from the browser
  // },
});
