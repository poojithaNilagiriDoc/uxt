import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './RGBSliderBasics.story';
export { default as Dynamic } from './RGBSliderDynamic.story';

const RGBSliderStories = { title: 'RGBSlider', decorators: [withKnobs] };

export default RGBSliderStories;
