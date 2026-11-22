// Pages that are built but switched off. While false, the page has no menu option and its URL
// opens the title menu instead.
export const features = {
  whoIsAidan: false, // waiting on the 3D scan
}

// Main menu on the title screen, top to bottom. `to` is the screen each option opens.
export const mainMenu = [
  { label: 'Careers', to: 'setlist' },
  { label: 'Skills', to: 'skills' },
  { label: 'Who Is Aidan?', to: 'who', feature: 'whoIsAidan' },
].filter((option) => !option.feature || features[option.feature])
