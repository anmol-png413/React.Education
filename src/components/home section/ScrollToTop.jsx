// // import { useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';

// // function ScrollToTop() {
// //   const { pathname } = useLocation();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [pathname]);

// //   return null;
// // }

// // export default ScrollToTop;

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: 'instant' // 'smooth' ki jagah 'instant' use karo
//     });
//   }, [pathname]);

//   return null;
// }

// export default ScrollToTop;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // ✅ Agar Featured University se Programme button click hua hai
    if (location.state?.scrollToCenter) {
      // Thoda delay do taaki page load ho jaye
      setTimeout(() => {
        const scrollAmount = window.innerHeight * 0.25; // 25% neeche (beech mein)
        
        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }, 100);
      
      // State clear karo taaki next time issue na ho
      window.history.replaceState({}, document.title);
    } else {
      // ✅ Baaki sabhi pages ke liye TOP pe scroll karo
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [location.pathname, location.state]);

  return null;
}

export default ScrollToTop;