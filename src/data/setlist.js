// Portfolio content rendered as setlist sections. Order here = section numbers on the page.
// Each track: title (top line), optional meta (second line, like the artist name in the game),
// optional date (under the stars), optional href (opened with Enter / click).

// School projects, in ascending CSCI course order. Shown as link-less setlist rows (they highlight):
// title on top, course on the second line, language under the stars. `date` is intentionally
// blank, to be filled in later. `description` is NOT shown anywhere yet; it's kept here (one string
// per paragraph) so a future popup can be handed `project.description` directly.
export const schoolProjects = [
  {
    title: 'Evil Hangman',
    course: 'CSCI 261',
    courseName: 'Programming Concepts',
    tech: 'C++',
    date: '',
    description: [
      'One of my earliest big programming projects, and honestly one of my proudest accomplishments. I was tasked with creating something called Evil Hangman, which is essentially Hangman that actively cheats against you. Instead of picking a word at the beginning of the game, the program keeps a massive dictionary of possible English words and waits until the player starts guessing letters.',
      "Every time you guess a letter, the program looks through all the remaining possible words and tries to narrow things down in a way that avoids revealing that letter. In other words, it does everything it can to make you lose. The actual word isn't determined until the very end, so you could be playing the entire game without the program having committed to a single word!",
      'This project was especially challenging because it required linked lists, pointers, and a lot of careful memory management in C++. I took a different approach than most of my classmates, and getting everything working correctly took weeks. Pointers and linked lists as a freshman were no joke, but getting this one working was incredibly satisfying.',
    ],
  },
  {
    title: 'Clue Game',
    course: 'CSCI 306',
    courseName: 'Software Engineering',
    tech: 'Java',
    date: '',
    description: [
      'One of my first really big software projects. I worked with a partner over several months to build a software version of the classic board game Clue.',
      'We had to build out the game board, generate the characters, implement the rules, and get all the game logic working together so that someone could actually sit down and play. The game followed the same general mechanics as the original, with players making moves, gathering information, and trying to figure out who committed the crime, with what weapon, and in which room.',
      'What made this project interesting was just how much went into making a seemingly simple board game work in software. There were a ton of moving pieces, rules, and interactions that all had to work together. It was a great introduction to working on a larger application with another developer and seeing how much planning goes into building something beyond a small programming assignment.',
    ],
  },
  {
    title: 'City Traffic Simulation',
    course: 'CSCI 423',
    courseName: 'Computer Simulation',
    tech: 'Java',
    date: '',
    description: [
      'This project was an absolute beast, but so cool once it finally worked.',
      'I built a computer simulation that generated a city street with two flows of traffic, cars of randomly generated lengths, pedestrians walking along the sidewalks, and traffic lights that changed depending on whether a pedestrian pressed the crosswalk button.',
      'The really interesting part was that practically everything happening in the simulation was driven by a gigantic, predetermined random number generator (RNG) file. This file controlled things like when cars appeared, how long they were, when pedestrians spawned, whether they pressed the crosswalk button, and all sorts of other events. The simulation had to take all of this input and make everything interact correctly.',
      'Getting all the different systems to work together was incredibly challenging. I spent weeks trying to get it 100% right, and it absolutely killed me at times. But when everything finally came together and the simulation ran exactly as intended, it was one of those projects that made all the frustration worth it.',
    ],
  },
  {
    title: 'Language Learning Akinator',
    course: 'CSCI 448',
    courseName: 'Mobile Application Development',
    tech: 'Kotlin',
    date: '',
    description: [
      'One of my favorite classes and one of my favorite programming languages came out of this project!',
      'For our final project, I worked with a team of four to develop an Android application using Kotlin and Android Studio. The idea was to combine Akinator with learning Spanish.',
      'The application worked similarly to Akinator: you would think of a character, and the app would try to guess who you were thinking of by asking a series of questions. The twist was that all the questions were in Spanish, with English translations underneath so you could still understand what you were answering. Users could respond with "Sí," "No," or "No sé" (I don\'t know).',
      'If the app guessed your character correctly, awesome! But if it got it wrong, you could enter the correct character, and the application would add a new node to its decision tree so it could learn from the mistake and make better guesses in the future.',
      'This project was especially memorable because mobile development was a completely new way of programming for me. I struggled HARD at first. Android Studio, Kotlin, and the whole mobile development environment took some getting used to, but eventually everything clicked. By the end of the semester, I felt like a beast working with it. Kotlin ended up becoming one of my favorite languages!',
    ],
  },
  {
    title: 'Tower Defense Heroes',
    course: 'CSCI 477',
    courseName: 'Game Development',
    tech: 'GameMaker (GML)',
    date: '',
    description: [
      'A multiplayer tower defense game I developed with a team of four over the course of a semester. And not just any multiplayer game — it was the only multiplayer game the entire class ended up making!',
      'The game featured a 2D map with a bug spawner in the center and opposing player bases, each protected by a main king tower. Players could place defensive towers around the map to stop waves of bugs from making their way toward and destroying their king tower.',
      'One of my favorite mechanics was the pathfinding system. Bugs would evaluate their surroundings and determine where to go based on the closest available target. This meant that if you strategically placed your buildings, you could actually manipulate the bugs into going after your opponent instead of you!',
      "It added a really fun strategic element because you weren't just trying to build the best defense for yourself — you could also use your opponent's positioning against them.",
      'Building a multiplayer game with a team over an entire semester was a really cool experience, especially knowing we were the only group in the class that managed to pull it off.',
    ],
  },
  {
    title: 'Introduction to Computer Vision',
    course: 'CSCI 507',
    courseName: 'Introduction to Computer Vision',
    tech: '',
    date: '',
    description: [
      'This class was where I first really got interested in computer vision, and it actually inspired me to create my Paint-by-Numbers Generator!',
      'We started by exploring the history of computer vision, from its earliest developments to the techniques being used today. From there, we dove into how computers can actually interpret and make sense of images, and spent the semester building a bunch of smaller projects to put those concepts into practice.',
      'Some of the projects included stitching multiple images together to create a panorama, detecting and counting vehicles driving along a highway, and building an object identification system.',
      'There were a ton of smaller exercises and experiments throughout the class, each exploring a different part of computer vision. What I really enjoyed was seeing how something as seemingly simple as an image could be broken down, analyzed, and understood computationally.',
      'Most importantly, this class sparked the idea for my Paint-by-Numbers Generator. Learning about image processing and computer vision made me want to take those concepts further and build something of my own.',
    ],
  },
  {
    title: 'Self-Made Programming Language',
    course: 'CSCI 561',
    courseName: 'Theory of Computation',
    tech: 'OCaml',
    date: '',
    description: [
      'In OCaml, we wrote a parser with a ton of grammar rules and the like. Basically, we made a small programming language.',
    ],
  },
]

export const sections = [
  {
    title: 'Work Experience',
    tracks: [
      {
        title: 'Full-Stack Software Engineer',
        meta: 'First Class Motors',
        date: '2026 – Present',
        href: 'https://lotmanager360.com',
      },
      {
        title: 'Software Engineering Intern',
        meta: 'Pie Insurance',
        date: '2023',
      },
    ],
  },
  {
    title: 'Projects',
    tracks: [
      {
        title: "Marlow's Diner",
        meta: 'Horror Game · Work in Progress',
        date: 'Est. 2027',
      },
      {
        title: 'LotManager360',
        meta: 'Dealership CRM',
        date: '2026',
        href: 'https://lotmanager360.com',
      },
      {
        title: 'DreamVault',
        meta: 'Encrypted Dream Journal',
        date: '2025 – 2026',
        href: 'https://github.com/areaves1207/dream-vault',
      },
      {
        title: 'Paint By Numbers Generator',
        meta: 'Computer Vision',
        date: '2025',
        href: 'https://pbn-gen.vercel.app',
      },
      {
        title: 'Learn NATO',
        meta: 'Phonetic Alphabet Trainer',
        href: 'https://learnnato.com',
      },
      {
        title: 'Aidan Reaves Portfolio',
        meta: 'Hey, that\'s this site!',
        href: 'https://aidanreaves.com',
      },
    ],
  },
  {
    title: 'School Projects',
    static: true, // highlights on hover / arrow keys, but no link: clicking does nothing (yet)
    tracks: schoolProjects,
  },
]

// Bonus sheet content (About Me).
export const aboutMe = {
  title: 'About Me',
  tracks: [
    { title: 'Aidan Reaves', meta: 'Full-Stack Software Engineer' },
    { title: 'Denver, CO', meta: 'Open to relocation' },
    {
      title: 'M.S. Computer Science',
      meta: 'Colorado School of Mines',
      date: 'May 2025',
    },
    {
      title: 'B.S. Computer Science',
      meta: 'Colorado School of Mines',
      date: 'May 2024',
    },
    { title: 'GitHub', meta: 'areaves1207', href: 'https://github.com/areaves1207' },
    { title: 'LinkedIn', meta: 'aidan-reaves', href: 'https://www.linkedin.com/in/aidan-reaves/' },
    { title: 'Email Me', meta: 'areaves@mines.edu', href: 'mailto:areaves@mines.edu' },
  ],
}

// Downloads sheet: the resume rendered from this PDF, plus a download button.
export const resume = {
  title: 'Resume',
  pdf: '/resume.pdf',
  fileName: 'Aidan-Reaves-Resume.pdf',
}
