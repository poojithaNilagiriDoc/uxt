import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './TabBarBasics.story';
export { default as Dynamic } from './TabBarDynamic.story';

const TabBarStories = { title: 'TabBar', decorators: [withKnobs] };

export default TabBarStories;
