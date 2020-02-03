import React from 'react';

export default () => {
  const [ABValue, setABValue] = React.useState();
  const remoteConfig = window.firebase.remoteConfig();
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000
  };

  remoteConfig.ensureInitialized()
  .then(() => {
    console.log('Firebase Remote Config is initialized');
    const AB = remoteConfig.getValue('promo_area_enabled');
    setABValue(AB.asString());
  })
  .catch((err: any) => {
    console.error('Firebase Remote Config failed to initialize', err);
  });

  const handleAB = () => {
    remoteConfig.fetchAndActivate()
    .then(() => {
      const AB = remoteConfig.getValue('promo_area_enabled');
      setABValue(AB.asString());
    })
    .catch((err: any) => {
      console.error(err);
    });
  }

  return (
    <>
      <span>App</span>
      <button onClick={handleAB}>fetchAB</button>
      <br/>
      <div>
        abValue: {ABValue}
      </div>
    </>

  )
}
