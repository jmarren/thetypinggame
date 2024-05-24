// performance-polyfill.js
// if (typeof performance === "undefined") {
//   global.performance = {
//     now: function() {
//       const [sec, nanosec] = process.hrtime();
//       return sec * 1000 + nanosec / 1e6;
//     }
//   };
// }
//
