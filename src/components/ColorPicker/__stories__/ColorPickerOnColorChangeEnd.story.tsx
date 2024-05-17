import components from 'uxt-graphics/graphics/components';
import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Graphic from '../../Graphic';
import ColorPicker from '../index';
import type { RGBAColor } from '../../_internal/ColorPickerContent';

export default function ColorPickerOnColorChangeEnd() {
  const [color, setColor] = React.useState<RGBAColor>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSavedColorsDeleting, setIsSavedColorsDeleting] =
    React.useState(false);
  const [savedColors, setSavedColors] = React.useState([
    { r: 255, g: 0, b: 0, a: 1 },
    { r: 0, g: 255, b: 0, a: 1 },
    { r: 0, g: 0, b: 255, a: 1 },
    { r: 50, g: 150, b: 255, a: 0.5 },
  ]);
  const [savedColorsCheckedIndices, setSavedColorsCheckedIndices] =
    React.useState<Array<number>>();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <Graphic
          style={{
            fill: `rgba(${color?.r || 0}, ${color?.g || 0}, ${color?.b || 0}, ${
              color === undefined || color === null ? 1 : color.a
            })`,
          }}
          svg={components}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <ColorPicker
          showOpacity={boolean('showOpacity', true)}
          isOpen={isOpen}
          isSavedColorsDeleting={isSavedColorsDeleting}
          onColorChangeEnd={(color: RGBAColor) => {
            setColor(color);
          }}
          onIsOpenChange={setIsOpen}
          onIsSavedColorsDeletingChange={setIsSavedColorsDeleting}
          onSavedColorsChange={setSavedColors}
          onSavedColorsCheckedIndicesChange={(indices: Array<number>) =>
            setSavedColorsCheckedIndices(indices)
          }
          permanentColors={[
            { r: 0, g: 0, b: 0, a: 0 },
            { r: 0, g: 0, b: 0, a: 1 },
            { r: 255, g: 255, b: 255, a: 1 },
          ]}
          savedColors={savedColors}
          savedColorsCheckedIndices={savedColorsCheckedIndices}
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </div>
  );
}
