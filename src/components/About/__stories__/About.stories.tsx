import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './AboutBasics.story';

const AboutStories = { title: 'About', decorators: [withKnobs] };

export default AboutStories;
