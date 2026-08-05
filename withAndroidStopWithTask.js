const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withAndroidStopWithTask(config) {
  return withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application[0];
    
    // Buscamos todos los servicios declarados en el manifiesto nativo
    if (mainApplication.service) {
      mainApplication.service.forEach((service) => {
        // Buscamos el servicio encargado del reproductor de audio nativo
        if (
          service['$']['android:name'] && 
          (service['$']['android:name'].includes('TrackPlayer') || 
           service['$']['android:name'].includes('QueuePlayer') ||
           service['$']['android:name'].includes('Playback'))
        ) {
          // Le forzamos el atributo nativo de Android de forma estricta
          service['$']['android:stopWithTask'] = 'true';
        }
      });
    }
    return config;
  });
};
