import { withKnobs } from '@storybook/addon-knobs';

export { default as Basics } from './NotificationServiceBasics.story';

const NotificationServiceStories = {
  title: 'NotificationService',
  decorators: [withKnobs],
};

export default NotificationServiceStories;
