import { withKnobs } from '@storybook/addon-knobs';

export { default as Basics } from './DialogServiceBasics.story';

const DialogServiceStories = {
  title: 'DialogService',
  decorators: [withKnobs],
};

export default DialogServiceStories;
