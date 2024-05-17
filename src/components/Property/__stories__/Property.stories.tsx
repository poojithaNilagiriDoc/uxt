import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './PropertyBasics.story';
export { default as Dynamic } from './PropertyDynamic.story';
export { default as NameColumnWidth } from './PropertyNameColumnWidth.story';

const PropertyStories = { title: 'Property', decorators: [withKnobs] };

export default PropertyStories;
