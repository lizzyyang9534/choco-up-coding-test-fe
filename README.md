## Preview This App
- [Preview Site](https://choco-up-coding-test-fe.netlify.app/)
- [CodeSandbox](https://codesandbox.io/p/github/lizzyyang9534/choco-up-coding-test-fe/main?file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clcocl21h000v7rhfcvaxaeir%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clcocl5b0000x3b6fd1u83zrj%2522%253A%257B%2522key%2522%253A%2522clcocl5b0000x3b6fd1u83zrj%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522clcocm3lj00bs3b6fsvzi5zey%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522key%2522%253A%2522clcocm11x009b3b6fmoc8j0n1%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clcocl5b0000x3b6fd1u83zrj%2522%252C%2522spacesOrder%2522%253A%255B%2522clcocl5b0000x3b6fd1u83zrj%2522%255D%257D)

## Run It Locally
1. Run command `yarn` for installing node modules
1. Run `yarn start` for starting this app

## Used Framework and Libraries
### Framework
- React.js

### Libraries
- [Chakra UI](https://chakra-ui.com/)
  - The Chakra components allow us to highly customize
  - It provides a simple and clean way to make responsive style, ex. `<Box  width={['100%', '50%', '25%']} />`
  - We can reduce duplicate styles by defining variants of components in theme file
- [XState](https://xstate.js.org/)
  - It's easy to write and read the flow
  - The [visualizer](https://stately.ai/viz) can help us create a chart to clarify the flow
    ![image](https://user-images.githubusercontent.com/16132774/211271982-ff0635b9-5bcd-45b9-ab39-83a74acc2cdb.png)
  - Machines are reusable
- [Ramda](https://ramdajs.com/)
  - It contains many useful functions so that we can write the logic in a clean and readable way
  - It's convenient to make compositions of functions as utilities

## UI/UX improvement
### What I did
- Because there might be many departments and occupy entire screen, I added a expand/collapse button to hide the departments after first line
- Added a `Scroll to Top` button and a `Scroll to Bottom` button

### Something could be improved (haven't implemented)
- How to show the selected department which is collapsed
