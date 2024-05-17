import components from 'uxt-graphics/graphics/components';
import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Graphic from '../../Graphic';
import ColorPicker from '../index';
import type { RGBAColor, NamedColors } from '../index';
import getRGBAFromNamedColor from '../../_helpers/getRGBAFromNamedColor';

export default function ColorPickerDynamic() {
  const [color, setColor] = React.useState<NamedColors | RGBAColor>(
    getRGBAFromNamedColor('wheat'),
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSavedColorsDeleting, setIsSavedColorsDeleting] =
    React.useState(false);
  const [savedColors, setSavedColors] = React.useState<Array<RGBAColor>>([
    { r: 255, g: 0, b: 0, a: 1 },
    { r: 0, g: 255, b: 0, a: 1 },
    { r: 0, g: 0, b: 255, a: 1 },
    { r: 50, g: 150, b: 255, a: 0.5 },
  ]);
  const [savedColorsCheckedIndices, setSavedColorsCheckedIndices] =
    React.useState<Array<number>>();
  const { r, g, b, a } = color as RGBAColor;

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
          style={{ fill: `rgba(${r}, ${g}, ${b}, ${a})` }}
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
          color={color}
          showOpacity={boolean('showOpacity', true)}
          isOpen={isOpen}
          isSavedColorsDeleting={isSavedColorsDeleting}
          onColorChange={(color: RGBAColor) => {
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
