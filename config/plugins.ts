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
});
