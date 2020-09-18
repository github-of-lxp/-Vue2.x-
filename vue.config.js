module.exports = {
    configureWebpack: {
      // other webpack options to merge in ...
    },
  
    // devServer Options don't belong into `configureWebpack`
  
    devServer: {
      // public: "http://192.168.0.6:8080",
      public: "http://localhost:8080",
      hot: true,
  
      disableHostCheck: true
    }
  };
  