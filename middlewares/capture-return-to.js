
const captureReturnTo = (skipPaths = ['/login', '/register', '/logout']) => {
    return (req, res, next) => {
      const isStatic = req.path.match(/\.(css|js|png|jpg|svg|ico)$/);   //skips static file paths
      const isAjax = req.xhr;   //skips ajax requests
  
      
      if (
        req.method === 'GET' &&
        !skipPaths.some(path => req.path.includes(path)) &&
        !isStatic &&
        !isAjax
      ) {
        req.session.redirectUrl = req.originalUrl;
        //console.log('[CaptureReturnTo] Saved:', req.originalUrl);
      }
  
      next();
    };
  };
  
  export default captureReturnTo;
  
  