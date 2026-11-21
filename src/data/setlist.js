// Portfolio content rendered as setlist sections. Order here = section numbers on the page.
// Each track: title (top line), optional meta (second line, like the artist name in the game),
// optional date (under the stars), optional href (opened with Enter / click).

export const sections = [
  {
    title: 'Work Experience',
    tracks: [
      {
        title: 'Software Developer & Ops Manager',
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
        title: 'LotManager360',
        meta: 'Dealership CRM',
        date: '2026',
        href: 'https://lotmanager360.com',
      },
      {
        title: 'DreamVault',
        meta: 'Encrypted Dream Journal',
        date: '2025',
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
    ],
  },
]

// Bonus sheet content (About Me).
export const aboutMe = {
  title: 'About Me',
  tracks: [
    { title: 'Aidan Reaves', meta: 'Full-Stack Software Engineer' },
    {
      title: 'M.S. Computer Science',
      meta: 'Colorado School of Mines',
      date: '2025',
    },
    {
      title: 'B.S. Computer Science',
      meta: 'Colorado School of Mines',
      date: '2024',
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
