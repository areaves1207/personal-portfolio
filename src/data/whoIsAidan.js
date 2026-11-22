// "Who Is Aidan?" page: a character-select screen with Aidan as the character.

export const profile = {
  name: 'Aidan Reaves',
  tagline: 'Full-Stack Software Engineer',
  stats: [
    { label: 'Based in', value: 'Denver, CO' },
    { label: 'Education', value: 'M.S. Computer Science' },
    { label: 'School', value: 'Colorado School of Mines' },
    { label: 'Currently', value: 'First Class Motors' },
  ],
}

// Outfits, cycled with the arrows under the character.
//
// `model` is the path to a 3D scan of Aidan wearing that outfit: a .glb file placed in
// public/models/ (e.g. model: '/models/aidan-casual.glb'). It's loaded only when that outfit is
// picked, then scaled to stand on the stage. While `model` is null, a stand-in mannequin is shown,
// dressed in `colors` so switching outfits already works.
export const outfits = [
  {
    id: 'casual',
    name: 'Casual',
    model: null,
    colors: { top: '#3d6aa8', bottom: '#2f3542', shoes: '#e6e2da' },
  },
  {
    id: 'smart-casual',
    name: 'Smart Casual',
    model: null,
    colors: { top: '#d8cfbd', bottom: '#4b3b2b', shoes: '#3a2818' },
  },
  {
    id: 'business',
    name: 'Business',
    model: null,
    colors: { top: '#262b36', bottom: '#262b36', shoes: '#141414', tie: '#a3262a' },
  },
]
