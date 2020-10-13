# IPL trivia
 
> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

View Demo at - https://ipl-trivia.netlify.app/

A website visualizing performance of teams in IPL.

## Tools and Tech Used

- [ReactJS](https://reactjs.org/) - Frontend Framework.  
- [Recharts](http://recharts.org/) - D3 based react chart library  
- [React Router](https://reactrouter.com/) - D3 based react chart library
- [React Loadable](https://github.com/jamiebuilds/react-loadable) - To improve website loading performance
- [React Loader Spinner](https://github.com/mhnpd/react-loader-spinner) - To show loader when website is Loading

## Features

- It is a progressive web app so it will cache upcoming requests. So it will reduce network traffic and improve user experience and we can also use it offline once it has enough    data in cache. It uses service-worker for achieving this.
- It uses React loadable component for improving loading time by requesting only those chunks which are required now instead of whole big chunk.
- It is responsive. It will work correctly for screen size>=4 inches.

## For Development

- You will need Node or Yarn to run the application.You can download it from here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).
- Now run following commands
  ```
  git clone https://github.com/jeel2308/IPL-trivia.git
  cd IPL-trivia
  ```

- Now run following commands
  ```
  //if you are using yarn
  yarn
  yarn start
  
  //if you are using npm
  npm install 
  npm run start
  ```
  
- Now go on http://localhost:3000/ in a browser to see the app

## For Production

- run following commands
  ```
  // if you are using yarn
  yarn build
  // if you are using npm
   npm run build
  ```
  
## Screenshots
<img src="https://github.com/jeel2308/IPL-trivia/blob/master/Screenshots/Screenshot%202020-09-29%20195714.png" width="300" />

<img src="https://github.com/jeel2308/IPL-trivia/blob/master/Screenshots/Screenshot%202020-09-29%20195748.png" width="300" />

<img src="https://github.com/jeel2308/IPL-trivia/blob/master/Screenshots/Screenshot%202020-09-29%20195810.png" width="300" />

  
  
  

  
