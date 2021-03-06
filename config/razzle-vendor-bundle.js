module.exports = (baseConfig, { target, dev }, webpack) => {
  let config = baseConfig

  // Change the name of the server output file in production
  if (target === 'web') {
    // modify filenaming to account for multiple entry files
    config.output.filename = dev
      ? 'static/js/[name].js'
      : 'static/js/[name].[hash:8].js'
    config.output.chunkFilename = dev
      ? 'static/js/[name].c.js'
      : 'static/js/[id].[hash:8].c.js'

    // add another entry point called vendor
    config.entry.vendor = [
      // now that React has moved, we need to Razzle's polyfills because
      // vendor.js will be loaded before our other entry. Razzle looks for
      // process.env.REACT_BUNDLE_PATH and will exclude the polyfill from our normal entry,
      // so we don't need to worry about including it twice.
      require.resolve('razzle/polyfills'),
      require.resolve('react'),
      require.resolve('react-dom'),
      // ... add any other vendor packages with require.resolve('xxx')
    ]

    config.optimization = {
      // Chunk splitting optimiztion
      splitChunks: {
        chunks: 'all',
        name: true,
      },
    }
  }
  return config
}
