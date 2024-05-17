import { configureActions } from '@storybook/addon-actions';

configureActions({
  clearOnStoryChange: true,
  depth: 2,
  limit: 10,
});
