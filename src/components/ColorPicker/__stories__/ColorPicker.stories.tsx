import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './ColorPickerBasics.story';
export { default as Dynamic } from './ColorPickerDynamic.story';
export { default as OnColorChangeEnd } from './ColorPickerOnColorChangeEnd.story';

const ColorPickerStories = { title: 'ColorPicker', decorators: [withKnobs] };

export default ColorPickerStories;
