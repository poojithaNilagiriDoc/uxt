import React from 'react';
import { action } from '@storybook/addon-actions';
import ColorPicker from '../index';
import { RGBAColor } from '../../_internal/ColorPickerContent';

export default function ColorPickerBasics() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<RGBAColor>({
    a: 1,
    b: 150,
    g: 100,
    r: 50,
  });

  return (
    <ColorPicker
      color={color}
      onColorChange={(color: RGBAColor) => {
        setColor(color);
        action('onColorChange');
      }}
      opacityText="不透明性"
      onIsOpenChange={setIsOpen}
      isOpen={isOpen}
    />
  );
}
