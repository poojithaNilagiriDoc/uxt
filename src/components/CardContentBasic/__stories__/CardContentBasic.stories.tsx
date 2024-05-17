import { withKnobs } from '@storybook/addon-knobs';
export { default as Basics } from './CardContentBasicBasics.story';
export { default as LeftTextComponent } from './CardContentBasicLeftTextComponent.story';

const CardContentStories = {
  title: 'CardContentBasic',
  decorators: [withKnobs],
};

export default CardContentStories;
